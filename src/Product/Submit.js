/* 2.5 SUBMIT button */
export function Submit() {
  // this is what the system is targetting
  const submit = document.getElementsByClassName("d-captcha-submit");
  const d_c_submit = submit[0];
  const style = d_c_submit.style;
  d_c_submit.disabled = true;
  style.cursor = "default";
  return {
    enable: function () {
      d_c_submit.disabled = false;
      style.cursor = "pointer";
      style.opacity = "1";
      style.filter = "alpha(opacity=1)";
    },
  };
}
