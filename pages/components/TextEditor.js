import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function TextEditor() {
    const [text, setText] = useState('')
    
    function handleTextChange(value) {
        setText(value)
    }
    
    return (
        <ReactQuill
            value={text}
            onChange={handleTextChange}
        />
    )
}
