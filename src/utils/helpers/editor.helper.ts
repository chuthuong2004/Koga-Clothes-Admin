import { BASE_URL } from '@/config';
import { RcFile } from 'antd/es/upload';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { uploadSingleImage } from './upload.helper';
import { Media } from './editor-component.helper';

export function convertContent(str: string): EditorState {
  const blocksFromHtml = htmlToDraft(str);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(contentState);
}

export function draftContent(state: EditorState): string {
  const contentState = convertToRaw(state.getCurrentContent());

  return draftToHtml(contentState);
}



// ** handle update image in editor
export async function handlePastedFiles(file: object): Promise<object> {
  const data = await uploadSingleImage(file as RcFile, 'blogs')
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        resolve({ data: { link: BASE_URL + data } });
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file as RcFile);
    }
  });
};

export function mediaBlockRenderer(block: any) {
  // console.log(block.getType());
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: true,
      props: {
        src: block.getData().src,
      },
    };
  }

  return null;
}

