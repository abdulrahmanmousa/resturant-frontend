import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImagesModal = ({ attachments }) => {
  const [activePreviewAttachments, setActivePreviewAttachments] = useState([]);
  const [activeIndexPreviewAttachments, setActiveIndexPreviewAttachments] =
    useState(0);
  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const onClose = () => setIsModalOpenState(false);
  const onOpen = () => setIsModalOpenState(true);
  const handleClickOnAttachment = (attachmentIndex) => {
    setActiveIndexPreviewAttachments(attachmentIndex);
    onOpen();
  };

  const handleClosePreview = () => {
    onClose();
    setTimeout(() => {
      setActiveIndexPreviewAttachments(0);
      setActivePreviewAttachments([]);
    }, 300);
  };

  console.log(
    activePreviewAttachments,
    activeIndexPreviewAttachments,
    "hello",
    attachments,
  );

  return (
    <>
      <Dialog open={isModalOpenState} onOpenChange={handleClosePreview}>
        <DialogContent className="w-full max-w-[1440px]">
          {attachments?.length ? (
            <AnimatePresence>
              <AttachmentsPreview
                attachments={attachments}
                brandName={"asdf"}
                currentIndex={activeIndexPreviewAttachments}
                setCurrentIndex={setActiveIndexPreviewAttachments}
              />
            </AnimatePresence>
          ) : null}
        </DialogContent>
      </Dialog>

      <div className=" ">
        <div className="flex items-center gap-4 flex-grow w-full justify-start ">
          {attachments.length > 0 &&
            attachments.slice(0, 5).map((attachment, index) => (
              <button
                key={attachment.id}
                onClick={() => handleClickOnAttachment(index)}
                className="relative  rounded-xl overflow-hidden"
              >
                <div
                  className={`absolute w-full h-full rounded-[10px] top-0 left-0  hover:bg-black/70  transition-all ${index === 4 && attachments.length > 5 && "bg-black/60 "}`}
                />
                {index === 4 && attachments.length > 5 && (
                  <>
                    <span className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-30 text-[24px] text-white">
                      +{attachments.length - 5}
                    </span>
                  </>
                )}
                <AttachmentPreview attachment={attachment} />
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

const AttachmentPreview = ({ attachment, isBlurred = false }) => {
  const renderContent = () => {
    return (
      <img
        className={`aspect-square w-full  rounded-[10px] object-cover cursor-pointer ${
          isBlurred ? "blur-[2px] scale-105" : ""
        }`}
        src={attachment}
        alt={`attachment`}
      />
    );
  };

  return renderContent();
};
function AttachmentsPreview({ attachments, currentIndex, setCurrentIndex }) {
  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex > 0 ? currentIndex - 1 : attachments.length - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex < attachments.length - 1 ? currentIndex + 1 : 0,
    );
  };

  const renderFilePreview = (file) => {
    return (
      <img
        src={file}
        alt={file}
        width={1000}
        height={600}
        className="w-full h-full object-cover rounded-[20px]"
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[1440px] rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <div className="w-full flex">
            <Button className="w-[36px] h-[36px] min-w-[36px] min-h-[36px] ml-auto flex justify-center items-center bg-[#F7F7F7] text-[#484848] hover:text-white rounded-full p-2">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="relative flex items-center">
          <Button
            onClick={goToPrevious}
            className="w-[36px] h-[36px] min-w-[36px] min-h-[36px] flex justify-center items-center bg-[#F7F7F7] text-[#484848] hover:text-white rounded-full p-2 mx-4"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="w-full max-h-[656px] md:h-[656px] mx-auto mt-4">
            {renderFilePreview(attachments[currentIndex])}
          </div>

          <Button
            onClick={goToNext}
            className="w-[36px] h-[36px] min-w-[36px] min-h-[36px] flex justify-center items-center bg-[#F7F7F7] text-[#484848] hover:text-white rounded-full p-2 mx-4"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex overflow-x-auto p-4 gap-2 justify-center">
          {attachments.map((file, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 border-[2px] border-[#7F7F7F] rounded-[10px] overflow-hidden hover:border-black transition-all ${
                index === currentIndex ? "!border-black" : "border-transparent"
              }`}
            >
              <img
                src={file}
                alt={file}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImagesModal;
