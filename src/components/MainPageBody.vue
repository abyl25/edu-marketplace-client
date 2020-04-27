<template>
  <div class="bodyPart">
    <hr>
    <div v-scrollanimation class="imgDiv">
      <img class="categories" src="../assets/11.jpg" alt />
      <button-b :btnType="'btn third'" :btnName="'Web-Programming'" :btnSrc="'/courses/development'" class="webButton"></button-b>
    </div>
    <hr>
    <div v-scrollanimation class="imgDiv">
      <img class="categories" src="../assets/12.jpg" alt />
      <button-b :btnType="'btn sixth'" :btnName="'Design'" :btnSrc="'/courses/design'" class="webButton"></button-b>
    </div>
    <hr>
    <div v-scrollanimation class="imgDiv">
      <img class="categories" src="../assets/13.jpg" alt />
      <button-b :btnType="'btn seventh'" :btnName="'Business'" :btnSrc="'/courses/business'" class="webButton"></button-b>
    </div>
    <hr>
    <div v-scrollanimation class="imgDiv">
      <img class="categories" src="../assets/14.jpg" alt />
      <button-b :btnType="'btn fifth'" :btnName="'Photography'" :btnSrc="'/courses/photography'" class="webButton"></button-b>
    </div>
  </div>
</template>

<script>
import ButtonB from "../components/ButtonB"

export default {
  name: "TesterX",
  components: {
      buttonB: ButtonB
  },
  data() {
      return {
        //   data: "first btn"
      }
  }
};
</script>

<style scoped>
hr {
  border: 2px solid white;
}

.before-enter {
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.7s ease-out;
}

.enter {
  opacity: 1;
  transform: translateY(0px);
}

.categories {
  position: relative;
  /* display: block; */
  /* flex-grow: 1;
     flex-shrink: 0; */
  width: 100%;
  max-height: 700px;
}
.imgDiv {
  flex-grow: 1;
  flex-shrink: 0;
  padding-bottom: 0px;
  /* margin-bottom: -5px; */
  display: flex;
  justify-content: center;
  /* max-height: 700px; */
  /* height: 700px; */
}

.webButton {
  position: absolute;
  top: 41%;
  /* left: 40%; */
  /* transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); */
}
.imgDiv webButton {
  vertical-align: middle;

}

</style>
