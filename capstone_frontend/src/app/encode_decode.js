export const decodeBase64Image = (base64String) => {
  const img = new Image();
  img.src = `data:image/png;base64, ${base64String}`;
  return img.src;
};

export const encodeImageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(imageFile);
  });
};
