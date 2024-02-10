"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface FileData {
  file: File;
  id: number;
}

const MyComponent: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [botId, setBotId] = useState<string>("");
  const [youtubeLinks, setYoutubeLinks] = useState<string>("");
  const [articleLinks, setArticleLinks] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files as FileList);
    const filesArray = selectedFiles.map((file) => ({
      file: file,
      id: Math.floor(Math.random() * 10000),
    }));
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleBotIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBotId(e.target.value);
  };

  const handleYoutubeLinksChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYoutubeLinks(e.target.value);
  };

  const handleArticleLinksChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArticleLinks(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const basicAuth =
      "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";
    const baseUrl =
      "https://coach-api-ovh.coachbots.com/api/v1/accounts/create-bot-by-details/";

    const formData = new FormData();
    files.forEach(({ file }) => {
      formData.append(`attatched_pdfs`, file, file.name.trim());
    });
    formData.append("bot_id", botId);

    const media_data = {
      youtube_links: youtubeLinks,
      article_links: articleLinks,
    };
    formData.append("media_data", JSON.stringify(media_data));

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: {
        Authorization: basicAuth,
      },
      body: formData,
    };

    try {
      const response = await fetch(baseUrl, requestOptions);
      if (response.ok) {
        console.log("Files uploaded successfully");
        setFiles([]);
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="botId">Enter Bot ID:</label>
          <input
            type="text"
            id="botId"
            value={botId}
            onChange={handleBotIdChange}
            required
          />
        </div>
        <div>
          <label htmlFor="youtubeLinks">Enter YouTube Links:</label>
          <input
            type="text"
            id="youtubeLinks"
            value={youtubeLinks}
            onChange={handleYoutubeLinksChange}
            required
          />
        </div>
        <div>
          <label htmlFor="articleLinks">Enter Article Links:</label>
          <input
            type="text"
            id="articleLinks"
            value={articleLinks}
            onChange={handleArticleLinksChange}
            required
          />
        </div>
        <input type="file" onChange={handleFileChange} multiple accept=".pdf" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default MyComponent;
