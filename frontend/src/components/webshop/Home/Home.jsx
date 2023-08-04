import './Home.css'

const Homee = () => {
    return (<>
      <section className="section1">
        <div className="weekly-offer">
                <div className='text'>
                    
                    
                    <div className='szoveg'>
                        <h2 className='torokcim'>A hónap kávéja</h2>
                        <h3 className='toroktext'>Az Oszmán Birodalomból származó török kávét ritkán találjuk meg a kávézók kínálatában, 
                            s vélhetően odahaza is kevesen főznek, pedig tradicionális kávékülönlegesség. A tapasztalat 
                            mondatja: annyira finom, hogy át lehet rá szokni, egy idő után a hagyományos eljárással készített 
                            kávé tűnhet furcsa ízűnek. A Vajdaságban a mai napig nagy keletje van a török kávénak.
                            Speciális nyeles edény dzsezva kell hozzá és jó minőségű, nagyon finomra őrölt kávé.</h3> 
                            </div>
                            <img className='torok-img' 
                        src="https://foldjaro.hu/wp-content/uploads/2022/08/GettyImages-1312379746.jpg" 
                        alt='kave'  width={400} />

                    </div>
        
        </div>
      </section>

      </>
    )
  }
  
  export default Homee
  