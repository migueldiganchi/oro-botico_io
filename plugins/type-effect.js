export default ({ app }, inject) => {
  const typeEffect = async (text, element, delay = 50) => {
    for (let i = 0; i < text.length; i++) {
      element.innerHTML += text.charAt(i);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  };
  inject("typeEffect", typeEffect);
};
