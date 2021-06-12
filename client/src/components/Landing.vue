<template>
  <div class="box">
    <h1 class="title is-1">Welcome</h1>
    <div class="columns is-centered box-section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-danger">
                <p class="title">Keep Track of Groceries</p>
                <figure class="image">
                  <img src="../assets/fridge.png" alt="fridge" style="width:500px;height:600px;">
                </figure>
              </article>
              <article class="tile is-child notification is-info">
                <p class="title">Make a Shopping List</p>
                <figure class="image">
                  <img src="../assets/clipart1962663.png"  alt="shopping cart" style="width:500px;height:500px;">
                </figure>
              </article>
              <article class="tile is-child notification is-success">
                <p class="title">View your Stats</p>
                <figure class="image">
                  <img src="../assets/stats.jpg"  alt="stats" style="width:500px;height:400px;">
                </figure>
              </article>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
.box{
  margin-top: 40px;
  margin-right: 40px;
  margin-left: 40px;
}
.box-section{
  padding: 20px
}

.image {
  display: flex;
  justify-content: center;
}
</style>