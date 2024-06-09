import FileInputArea from "@components/FileInputArea"

const Home = () => {
  return (
    <section className="w-full text-center flex-center flex-col">
      <h1 className="head_text items-center">Welcome to <span className="orange_gradient">Aegis</span></h1>
      <p className="desc text-center">Scan your file for viruses effortlessly!</p>

      <FileInputArea />
    </section>
  )
}

export default Home