import './Home.css'

const Homee = () => {
    return (<div>

      <section className='section0'>
        <div className='nyeremenyjatek'>
        <div>
          <h2>Játsz velünk és nyerj akár egy espresso kávéfőzőt, vagy egy különleges kávéskészletet!  </h2>
        </div>
        <div>
          <button>Részletekért kattints!</button>
        </div>

        </div>

      </section>


      <section className="section1">
        <div className="weekly-offer">
                <div className='text'>
                    
                    
                    <div className='szoveg'>
                        <h2 className='torokcim'>A hónap kávéja</h2>
                        <h2></h2>
                        <h3 className='toroktext'>Az Oszmán Birodalomból származó török kávét ritkán találjuk meg a kávézók kínálatában, 
                            s vélhetően odahaza is kevesen főznek, pedig tradicionális kávékülönlegesség. A tapasztalat 
                            mondatja: annyira finom, hogy át lehet rá szokni, egy idő után a hagyományos eljárással készített 
                            kávé tűnhet furcsa ízűnek. A Vajdaságban a mai napig nagy keletje van a török kávénak.
                            Speciális nyeles edény dzsezva kell hozzá és jó minőségű, nagyon finomra őrölt kávé.Az Oszmán Birodalomból származó török kávét ritkán találjuk meg a kávézók kínálatában, 
                            s vélhetően odahaza is kevesen főznek, pedig tradicionális kávékülönlegesség. A tapasztalat 
                            mondatja: annyira finom, hogy át lehet rá szokni, egy idő után a hagyományos eljárással készített 
                            kávé tűnhet furcsa ízűnek. A Vajdaságban a mai napig nagy keletje van a török kávénak.
                            Speciális nyeles edény dzsezva kell hozzá és jó minőségű, nagyon finomra őrölt kávé.</h3> 
                      </div>
                            <img className='torok-img' 
                        src="https://www.koffeinbox.com/wp-content/uploads/2022/09/torok-kave-keszitese.jpg" 
                        alt='kave'   />

                    </div>
        
        </div>
      </section>
      <section className='section2'>

        <label>Kategóriák</label>
        <div className='categories'>
          <div>
            <h2>Szemes kávé</h2>
            <img src="https://www.manucafe.hu/~photo-250x250xcrop-15/brazilia-minas-swiss-water-decaf-szemes_15.jpg" alt="szemes" />
            
            </div>
            <div>
            <h2>Őrölt kávé</h2>
            <img src="https://kave-diszkont.hu/wp-content/uploads/2022/06/WEBP-orolt-1-kave-diszkont.hu-kave-webaruhaz-rendeles-online-webshop-hazhozszallitas-olcso-kedvezo-jo-ar-akak-540x540-1.webp" alt="orolt" />
            
            </div>
            <div>
            <h2> Kapszulás kávé</h2>
            <img src="https://www.coolcoffee.hu/custom/coolcoffe/image/cache/w0h0q80np1/Blog/kapszula/dolce-gusto-kompatibilis-toltheto-kavekapszula-coolcoffee.hu.jpg" alt="szemes" />
            
            </div>

        </div>
      </section>

      </div>
    )
  }
  
  export default Homee
  