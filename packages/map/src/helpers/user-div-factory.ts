export const userDivFactory = (user) => {
  return `<div class="m-marker">
        <div class="m-box" style="background-image: url('${user.photo}')"></div>
          <i class="fa fa-map-marker"></i>
      </div>`;
};