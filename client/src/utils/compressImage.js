import imageCompression from 'browser-image-compression';

export const compressImage = (file) => {
    return new Promise((resolve, reject) => {
        const options = {
            maxSizeMB: 0.5, // Maximum size in MB
            maxWidthOrHeight: 1920, // You can adjust this as needed
            useWebWorker: true,
        };

        imageCompression(file, options)
            .then((compressedFile) => {
                // Convert compressed file to Base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1]; // Remove the data URL part
                    const mimeType = compressedFile.type;
                    const base64DataURL = `data:${mimeType};base64,${base64String}`;
                    resolve(base64DataURL);
                    console.log(base64DataURL)
                };
                reader.onerror = (error) => reject(error);
                console.log(compressedFile)
                reader.readAsDataURL(compressedFile); // Read as Data URL to get Base64
            })
            .catch((error) => {
                console.error('Error compressing image:', error);
                reject(error);
            });
    });
};
