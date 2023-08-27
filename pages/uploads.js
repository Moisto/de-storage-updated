import { DisplayModal, Modal, UploadFiles } from "@components/ui/uploadspage";
import { BaseLayout } from "@components/ui/layout";
import { Button, Navbar } from "@components/ui/shared";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavWrapper } from "@components/ui/wrappers";
import { ethers } from "ethers";
import contractabi from 'components/abi/contractabi'








export default function Uploads() {
  // files
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileDataUrls, setFileDataUrls] = useState([]);
  const [fileNames, setFileNames] = useState([]);


  // Search for items
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  
  const contractAddr = "0xCD5d51a0378f4060611F304d664035B5A50FCb7d";
  
  const getContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum); // A connection to the Ethereum network
      var signer = await provider.getSigner(); // Holds your private key and can sign things
      const Contract = new ethers.Contract(contractAddr, contractabi, signer);
      return Contract;
    } else {
      alert("No wallet detected");
    }
  };

  const getDocuments = async () => {
    const deContract = await getContract();
    var projects = await deContract.getDocuments(); 
    console.log(projects) 
    return projects;
  }



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

    // setSelectedFile((prevSelectedFiles) => [
    //   ...prevSelectedFiles,
    //   ...newFiles,
    // ]);


    setIsModalVisible(false);
  };

  const closeContentModal = () => {
    setIsModalVisible(false);
  }



  // Search functionality
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


  // Display content on File click
  const handleFileClick = (fileDataUrl)=> {
    setSelectedFile(fileDataUrl)
  }

  const closeModal = ()=> {
    setSelectedFile(null)
   
  }


  


  // Clear out search field when empty
  useEffect(() => {
    handleSearch()
    getDocuments()
    
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
      className={`bg-gradient-radial from-grey to-grey2 relative h-auto overflow-hidden  `}
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
              onFileClick={() => handleFileClick(fileDataUrls[index])}
              index={index}
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
        <div className="grid text-center grid-cols-2 md:grid-cols-5 py-4 gap-y-12 gap-10">
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
                  onFileClick={() => handleFileClick(fileDataUrls[index])}
                />
              </div>
            ))}
        </div>
      </div>
      {/* Contents dashboard ends */}

      {/* Modal */}
      {isModalVisible && (
        <Modal
          filechange={handleFileChange}
          closeContentModal={closeContentModal}
        />
      )}

      {/*Content display Modal */}
      {selectedFile && (
        <DisplayModal
          fileDataUrl={selectedFile}
          fileNames={fileNames}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

Uploads.Layout = BaseLayout;
