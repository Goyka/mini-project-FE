import axios from "@/api/instance";
import React from "react";

const EditContent = () => {
  const [createTitle, setCreateTitle] = useState("");
  const [createBody, setCreateBody] = useState("");
  const EditHandler = async () => {
    try {
      const res = await axios.patch("/api/post" + id, {
        title,
        content,
      });
      setCreateTitle(res.data.title);
      setCreateBody(res.data.content);
      closeModal();
      setMainPageKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <St.ModalWrap>
      <St.Modal>
        <>
          <div>
            <h4>게시글 수정하기</h4>
          </div>
          <input
            type="text"
            value={createTitle}
            onChange={(e) => setCreateTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="제목"
          />
          <textarea
            value={createBody}
            onChange={(e) => setCreateBody(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </>
        <St.Button onClick={EditHandler} buttontheme="primary">
          수정하기
        </St.Button>
      </St.Modal>
    </St.ModalWrap>
  );
};

export default EditContent;
