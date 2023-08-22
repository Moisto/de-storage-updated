import { Modal, UploadFiles } from "@components/ui/uploadspage";
import { BaseLayout } from "@components/ui/layout";
import { Button, Navbar } from "@components/ui/shared";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavWrapper } from "@components/ui/wrappers";









export default function Uploads() {
  // files
  // const [selectedFiles, setSelectedFiles] = useState([]);

  const [fileDataUrls, setFileDataUrls] = useState([]);
  const [fileNames, setFileNames] = useState([]);


  // Search for items
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  





  const handleFileChange = (event) => {
    const newFiles = event.target.files;

    const newFileDataUrls = Array.from(newFiles).map((file) =>
      URL.createObjectURL(file)
    );

    const newFileNames = Array.from(newFiles).map((file) => file.name);

    setFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]); // Update file names

    setFileDataUrls((prevFileDataUrls) => [
      ...prevFileDataUrls,
      ...newFileDataUrls,
    ]);

    // setSelectedFiles((prevSelectedFiles) => [
    //   ...prevSelectedFiles,
    //   ...newFiles,
    // ]);


    setIsModalVisible(false);
  };


  // const files = [
  //   ...fileDataUrls
  // ]

  const handleSearch = () => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }

    // Filter based on file names
    const filteredFileNames = fileNames.filter((fileName) =>
      fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Use the filtered file names to get corresponding URLs from fileDataUrls
    const filteredFileDataUrls = filteredFileNames.map(
      (fileName) => fileDataUrls[fileNames.indexOf(fileName)]
    );

    // If any matching files found in selectedFiles, set them as searchResults
    if (filteredFileDataUrls.length > 0) {
      setSearchResults(filteredFileDataUrls);

    } else {
      
      setSearchResults([])
    }

  };


  


  // Clear out search field when empty
  useEffect(() => {
    handleSearch()
    
  }, );


  // Modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

   

  // Add a deleteFile function to remove a file from the dashboard and selectedFiles array
  const deleteFile = (fileToDelete) => {

    // Remove the file from the dashboard by filtering it out
    const updatedSelectedFiles = fileDataUrls.filter(
      (file) => file !== fileToDelete
    );


    // Remove the file from searchResults if it exists
    const updatedSearchResults = searchResults
      ? searchResults.filter((file) => file !== fileToDelete)
      : [];

    // Update the selectedFiles state
    setFileDataUrls(updatedSelectedFiles);
    setSearchResults(updatedSearchResults);
  };




  
  return (
    
      <div
        className={`bg-gradient-radial from-grey to-grey2 relative   h-auto overflow-hidden  `}
      >
        <NavWrapper />

        <Navbar />

        {/* search for files */}
        <div className="flex justify-center">
          <div className=" md:w-[40%] flex justify-between text-center mt-10 px-8 py-3 bg-white rounded-[50px] border-[2px] border-circleRed">
            <input
              className="w-[100%] outline-none"
              placeholder="search files "
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <button
              // value={searchTerm}
              onClick={handleSearch}
              variant="round"
              size="sm"
            >
              Search
            </button>
          </div>
        </div>
        {/* search for files Ends*/}

        {/* Displayed search items */}
        <div className="px-16 flex gap-7 mt-10">
          {searchResults.map((file, index) => (
            <div key={index}>
              <UploadFiles
                key={index}
                file={file}
                fileNames={fileNames[index]}
                fileDataUrl={fileDataUrls[index]}
            
              />
            </div>
          ))}
        </div>
        {/* Displayed search items end */}

        {/* Buttons */}
        <div className="flex px-16 mt-20 gap-7">
          <Link href="./">
            <Button>Back</Button>
          </Link>

          <Button visibility={setIsModalVisible}>Upload</Button>
        </div>
        {/* Buttons end */}

        {/* Contents dashboard */}
        <div
          style={{ background: "rgba(255, 255, 255, 0.26)" }}
          className="mt-10 md:px-16 w-full min-h-screen bg-indigo-400 border-circleRed border-t-2 backdrop-blur-[10px]"
        >
          <div className="grid text-center grid-cols-2 md:grid-cols-5 py-4 gap-y-12">
            {fileDataUrls.length > 0 &&
              fileDataUrls.map((file, index) => (
                <div key={index}>
                  <UploadFiles
                    key={index}
                    file={file}
                    fileNames={fileNames[index]}
                    fileDataUrl={fileDataUrls[index]}
                    index={index}
                    deleteFile={deleteFile}
                  />
                </div>
              ))}
          </div>
        </div>
        {/* Contents dashboard ends */}

        {/* Modal */}
        {isModalVisible && <Modal filechange={handleFileChange} />}
        {/* Modal Ends */}

        

      </div>
    
  );
}

Uploads.Layout = BaseLayout;
