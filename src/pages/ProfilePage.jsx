import React, { useEffect, useState } from 'react';
import { supabase } from '../client.js';

const ProfilePage = ({ token, data }) => {
    const [imageURL, setImageURL] = useState('');

    async function handleProfileUpload(event) {
        const file = event.target.files[0]; // Get the selected file from the input element
        if (!file) return;

        try {
            // Upload the file to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('Profile-Pics')
                .upload(file.name, file);

            if (uploadError) {
                console.error('Error uploading file:', uploadError);
                return;
            }

            console.log('Upload Data:', uploadData);

            // Get the URL of the uploaded file
            const { publicURL, error: urlError } = await supabase.storage
                .from('Profile-Pics')
                .getPublicUrl(file.name);

            if (urlError) {
                console.error('Error retrieving file URL:', urlError);
                return;
            }

            console.log('Public URL:', publicURL);

            // Update the imageURL state variable with the public URL of the uploaded file
            setImageURL(publicURL);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        console.log('Image URL State:', imageURL);
    }, [imageURL]);

    return (
        <div>
            <h1>{token.user.user_metadata.username}</h1>
            <img src={imageURL} alt="Profile Picture" />
            <input type="file" accept="image/*" onChange={handleProfileUpload} />
        </div>
    );
};

export default ProfilePage;
