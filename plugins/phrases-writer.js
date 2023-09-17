export default ({ app }, inject) => {
  let timer = null;

  const typeEffect = async (text, element, delay = 63) => {
    element.innerHTML = "";
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    for (let i = 0; i < text.length; i++) {
      element.innerHTML += text.charAt(i);
      if (i <= text.length - 1) {
        element.innerHTML += "<b>|</b>";
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (i < text.length - 1) {
        element.innerHTML = element.innerHTML.replace("<b>|</b>", "");
      }
    }
  };

  const deleteEffect = async (element, delay = 63) => {
    element.innerHTML = element.innerHTML.replace("<b>|</b>", "");
    const text = element.innerHTML;
    for (let i = text.length; i >= 0; i--) {
      element.innerHTML = text.substring(0, i);
      element.innerHTML += "<b>|</b>";
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (i >= 0) {
        element.innerHTML = element.innerHTML.replace("<b>|</b>", "");
      }
    }
  };

  const writePhrases = async (phrases, element, delay = 6000) => {
    let currentPhrase = 0;
    while (true) {
      const text = phrases[currentPhrase];
      await typeEffect(text, element);
      await new Promise((resolve) => setTimeout(resolve, delay));
      await deleteEffect(element);
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }
  };

  inject("writePhrases", writePhrases);
};
