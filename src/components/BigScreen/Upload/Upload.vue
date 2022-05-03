<template>
	<div>
		<input type="file" @change="handleFileChange" />
	</div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { request } from "./request";
import assign from "lodash/assign";
const defaultConfig = {
	// 切片大小
	SIZE: 10 * 1024 * 1024,
	// 上传url
	url: "",
	data: [],
	chunk: "chunk",
	hash: "hash",
	filename: "filename",
	// 合并url
	urlMerge: "",
	headerMerge: {
		"content-type": "application/json",
	},
	dataMerge: {},
};
export default {
	name: "Upload",
	props: {
		config: {
			type: Object,
		},
	},
	emits: ["handleFileChange"],
	setup(props, { emit }) {
		const _actualConfig = assign(defaultConfig, props.config);
		const fileRef = ref(null);
		const data = ref([]);
		// 生成文件切片
		const createFileChunk = function (file, size = _actualConfig.SIZE) {
			const fileChunkList = [];
			let cur = 0;
			while (cur < file.size) {
				fileChunkList.push({ file: file.slice(cur, cur + size) });
				cur += size;
			}
			return fileChunkList;
		};
		// 合并切块
		const mergeRequest = async function () {
			await request({
				url: _actualConfig.urlMerge,
				headers: _actualConfig.headerMerge,
				data: JSON.stringify({
					filename: fileRef.value.name,
					..._actualConfig.dataMerge,
				}),
			});
		};
		// 上传切片
		const uploadChunks = async function () {
			const requestList = data.value
				.map(({ chunk, hash }) => {
					const formData = new FormData();
					formData.append(_actualConfig.chunk, chunk);
					formData.append(_actualConfig.hash, hash);
					formData.append(_actualConfig.filename, fileRef.value.name);

					_actualConfig.data.forEach((item) => {
						formData.append(item.key, item.value);
					});
					return { formData };
				})
				.map(async ({ formData }) => {
					request({
						url: _actualConfig.url,
						data: formData,
					});
				});

			await Promise.all(requestList); // 并发切片
			//  合并切片
			await mergeRequest();
		};
		const handleUpload = async function () {
			// 文件不存在
			if (!fileRef.value) return;
			// 对文件切片
			const fileChunkList = createFileChunk(fileRef.value);
			data.value = fileChunkList.map(({ file }, index) => ({
				chunk: file,
				hash: fileRef.value.name + "-" + index, // 文件名 + 数组下标
			}));
			await uploadChunks();
		};
		const handleFileChange = function (e) {
			const [file] = e.target.files;
			if (!file) return;
			fileRef.value = file;
			emit("handleFileChange", file);
		};
		return {
			handleFileChange,
			handleUpload,
		};
	},
};
</script>

<style scoped></style>
