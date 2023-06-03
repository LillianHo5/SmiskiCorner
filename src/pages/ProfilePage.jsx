import React, { useState } from 'react';
import { supabase } from '../client.js';

const ProfilePage = ({ token, data }) => {
    const [imageURL, setImageURL] = useState('');

    async function handleProfileUpload(event) {
        const file = event.target.files[0]; // Get the selected file from the input element
        if (!file) return;

        const filePath = `profile_pictures/${file.name}`;

        try {
            // Upload the file to Supabase Storage
            const { data: uploadData, error } = await supabase.storage
                .from('Profile-Pics')
                .upload(filePath, file);

            if (error) {
                console.error('Error uploading file:', error);
                return;
            }

            // Get the URL of the uploaded file
            const { publicURL, error: urlError } = supabase.storage
                .from('Profile-Pics')
                .getPublicUrl(filePath);

            if (urlError) {
                console.error('Error retrieving file URL:', urlError);
                return;
            }

            // Update the imageURL state variable with the public URL of the uploaded file
            setImageURL(publicURL);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h1>{token.user.user_metadata.username}</h1>
            <img src={imageURL} alt="Profile Picture" />
            <input type="file" accept="image/*" onChange={handleProfileUpload} />
        </div>
    );
};

export default ProfilePage;
