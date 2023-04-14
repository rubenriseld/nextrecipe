
export default function RecipeCard(){
    return(
      // <!-- RECIPE CARD COMPONENT -->
      <article className="recipe-card">
          {/* <!--single recipe card--> */}
          <img src="../structure/img/chickckckcn.png" alt="Image" />

          <div className="recipe-card-info">
              <h3 className="recipe-card-title">hejhej</h3>
              <div>
                  {/* <!-- taggar --> */}
                  <div className="flex">
                      {/* <!--  ----   TAG COMPONENTS ---- -->
                      <!-- vi kommer göra en komponent för en enskild tagg, så på receptkorts-komponenter
                          kommer vi ha tre tagg-komponenter
                       --> */}
                      <p className="tag color-secondary">20 min</p> 
                      <p className="tag color-secondary">asia</p>
                      <p className="tag color-secondary">vegan</p>
                      {/* <!-- END OF TAG COMPONENTS --> */}

                  </div>
                  {/* <!-- Stjärnor --> */}
                  <div className="flex">
                      {/* <!-- STAR/RATING COMPONENT -->
                      <!-- kommer kanske ha som en enda komponent?? --> */}
                      <p className="star text-color-secondary">&#9733;</p>
                      <p className="star text-color-secondary">&#9733;</p>
                      <p className="star text-color-secondary">&#9733;</p>
                      <p className="star text-color-secondary">&#9733;</p>
                      <p className="star text-color-secondary">&#9734;</p>
                      {/* <!-- END OF STAR/RATING COMPONENT --> */}
                  </div>
                  <p className="card-text">Casasfasfs</p>
              </div>
          </div>
      </article>
    )
    {/* <!-- END OF RECIPE CARD COMPONENT --> */}
}
