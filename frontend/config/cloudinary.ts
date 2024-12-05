export const uploadImage = async (
  image: File | null
): Promise<{ imageUrl: string | null; errorMsg: string | null }> => {
  try {
    if (!image) {
      throw new Error('No image selected');
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESENT!
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return { imageUrl: data.url, errorMsg: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('image upload error', error);
    return {
      imageUrl: null,
      errorMsg: error?.message || 'Image upload failed',
    };
  }
};
