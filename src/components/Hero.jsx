const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center flex-row w-full mt-3 mb-5">
        <h1 className="flex font-bold font-sans text-2xl">
          Summar<span className="orange_gradient">io</span>
        </h1>
        <button
          type="button"
          className="black_btn"
          onClick={() => {
            window.location.href =
              "https://github.com/vp2306/article-summarizer";
          }}
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize articles in a <span className="orange_gradient">jiff</span>{" "}
        with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI's GPT-4</span>
      </h1>
      <h2 className="desc">
        Read articles quickly with Summario, an article-summarizer that
        transforms long articles into quick, concise summaries
      </h2>
    </header>
  );
};

export default Hero;
