import "./style.css";
import { storage } from '../../services/firebase'
import { ref } from "firebase/storage"


export function Upload() {
  const storageRef = ref(storage, 'images')
  function cadastrar() {
    storageRef.put(file).then((snapshot) => { })
  }

  return (
    <main>
      <section>
        <form>
          <input type="file" />
          <button type="button" className="btn" onClick={cadastrar}>Enviar</button>
        </form>
      </section>
    </main>
  );
}