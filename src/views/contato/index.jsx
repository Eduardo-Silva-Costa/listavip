import './style.css'

export function Contato() {
  return (
    <main>
      <section className='contato'>
        <h2>Contato</h2>
        <p><a href="mailto:duduroots83@gmail.com"><i className="bi bi-envelope-fill"></i> E-mail</a></p>
        <p><a href="https://www.linkedin.com/in/eduardo-silva-costa-2aa550157/" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i> Linkedin</a></p>
        <p><a href=" https://wa.me/5591984506632"><i className="bi bi-whatsapp"></i> WhatsApp</a></p>
      </section>
    </main>
  )
}