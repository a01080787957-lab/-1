// 사진 업로드를 위해 한 번에 보낼 수 있는 크기를 5MB로 늘립니다.
export default { experimental: { serverActions: { bodySizeLimit: "5mb" } } };
