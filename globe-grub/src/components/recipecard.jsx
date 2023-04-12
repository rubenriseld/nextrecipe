
export default function RecipeCard(){
    return(
      // <!-- RECIPE CARD COMPONENT -->
      <article class="recipe-card">
          {/* <!--single recipe card--> */}
          <img src="../structure/img/chickckckcn.png" alt="Image" />

          <div class="recipe-card-info">
              <h3 class="recipe-card-title">hejhej</h3>
              <div>
                  {/* <!-- taggar --> */}
                  <div class="flex">
                      {/* <!--  ----   TAG COMPONENTS ---- -->
                      <!-- vi kommer göra en komponent för en enskild tagg, så på receptkorts-komponenter
                          kommer vi ha tre tagg-komponenter
                       --> */}
                      <p class="tag color-secondary">20 min</p> 
                      <p class="tag color-secondary">asia</p>
                      <p class="tag color-secondary">vegan</p>
                      {/* <!-- END OF TAG COMPONENTS --> */}

                  </div>
                  {/* <!-- Stjärnor --> */}
                  <div class="flex">
                      {/* <!-- STAR/RATING COMPONENT -->
                      <!-- kommer kanske ha som en enda komponent?? --> */}
                      <p class="star text-color-secondary">&#9733;</p>
                      <p class="star text-color-secondary">&#9733;</p>
                      <p class="star text-color-secondary">&#9733;</p>
                      <p class="star text-color-secondary">&#9733;</p>
                      <p class="star text-color-secondary">&#9734;</p>
                      {/* <!-- END OF STAR/RATING COMPONENT --> */}
                  </div>
                  <p class="card-text">Casasfasfs</p>
              </div>
          </div>
      </article>
      )
      {/* <!-- END OF RECIPE CARD COMPONENT --> */}
}
