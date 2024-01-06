import { BASE_URL } from '@/config'
import { cn, uploadSingleImage } from '@/utils'
import { Editor, IAllProps } from '@tinymce/tinymce-react'
import { memo } from 'react'
import './tiny_editor.css'
import './tiny_editor.scss'


interface TinyEditorProps extends IAllProps {
  error?: boolean
}
const TinyEditor = ({ apiKey = 'k9jo37emoj5l95v5yqacu9muausgbx67meymcil5kfhlcrmw', init, error, ...passProps }: TinyEditorProps) => {

  return (
    <div className={cn('rounded-xl border', error && 'border-error')}>
      <Editor
        apiKey={
          apiKey
        }

        init={{
          // content_style: "body { color: red; }",
          plugins: 'anchor autolink charmap codesample emoticons image images_upload_url link lists media searchreplace table visualblocks wordcount style',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          // images_upload_url: 'postAcceptor.php',
          placeholder: 'Vui lòng nhập nội dung',
          body_class: 'tiny_editor_error',
          /* we override default upload handler to simulate successful upload*/
          images_upload_handler: async function (blobInfo, progress) {
            console.log("blob: ", blobInfo);
            const result = await uploadSingleImage(blobInfo.blob() as any, 'reviews')
            console.log("result: ", result);
            return result ? BASE_URL + result : ''
          },
          ...init
        }}

        {...passProps}
      />
    </div>

  )
}

export default memo(TinyEditor)