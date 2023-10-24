import React, { useState } from 'react';
import { RiAttachment2 } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../features/message/messageApi';

const MessageForm = ({ createdData }) => {
  //message, receiverId, conversation_id
  const { id: userId } = useSelector((state) => state.auth.user);
  const { participant, creator, _id } = createdData || {};
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState(null);
  //
  const [sendMessage, { data, isLoading, isError, error }] =
    useSendMessageMutation();
  //
  const handleAttachment = (e) => {
    setFiles([...e.target.files]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (files) {
      for (const file of files) {
        formData.append('files[]', file);
      }
    }
    formData.append('message', message);
    formData.append(
      'receiverId',
      participant._id === userId ? creator._id : participant._id
    );
    formData.append('conversation_id', _id);
    formData.append('data_time', Date.now());

    sendMessage(formData);
    // sendMessage({
    //   files,
    //   message,
    //   receiverId: participant._id === userId ? creator._id : participant._id,
    //   conversation_id: _id,
    //   data_time: Date.now(),
    // });
    setMessage('');
    setFiles(null);
  };
  return (
    <div className="h-[60px] mb-5 bg-slate-900 bg-opacity-25">
      <form
        className="flex items-center justify-between w-full p-3 gap-3"
        onSubmit={handleSubmit}
      >
        <div className=" flex-1 bg-white flex flex-row rounded-full items-center pr-5">
          <input
            type="text"
            placeholder="Message"
            className="block w-full py-2 pl-4 mx-3 bg-white text-slate-900 rounded-full outline-none"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="attachment">
            <i className=" text-xl text-slate-900 cursor-pointer">
              <RiAttachment2 />
            </i>
          </label>
          <input
            id="attachment"
            type="file"
            multiple
            name="files"
            className=" hidden"
            onChange={handleAttachment}
          />
        </div>
        <button type="submit">
          <svg
            className="w-5 h-5 text-white origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
