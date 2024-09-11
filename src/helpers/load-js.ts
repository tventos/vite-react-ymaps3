export const loadJs = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    script.onload = () => {
      resolve(`Script ${src} loaded successfully`);
    };

    script.onerror = () => {
      reject(new Error(`Failed to load script ${src}`));
    };

    document.body.appendChild(script);
  });
};
