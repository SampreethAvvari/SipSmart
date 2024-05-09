import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import sankeydiagram from '../coffee.png';

export const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Introduction />
      <Sankey />
      <StarbucksChart />
      <Comparison />
      <Documentation />
    </div>
  );
};


function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-light fixed-top bg-transparent'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <b>SIPSMART</b>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Anusha
              </a>
            </li>
            {/* <li className='nav-item'>
              <a className='nav-link' href='#'>
                Contact
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Introduction() {
  return (
    <section className='introduction d-flex align-items-center '>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6 title'>
            <p className='title-welcome'>WELCOME TO</p>
            <p className='title-sip'>SIP-SMART!</p>
            <p className='title-desc'>Explore the nutritional impact of Starbucks beverages, 
              from calories to caffeine, and understand their effects on your health. 
              This website visualizes vital insights, Scroll down and unlock the knowledge to enjoy your drinks with confidence!</p>
          </div>
        </div>
        <div className='row position-absolute w-100 bottom-0'>
          <div className='col text-center text-bounce'>
            <p className='scroll-text'>scroll for more</p>
            <p className='scroll-text-v'>v</p>
            <p className='scroll-text-v'>v</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sankey() {
  return (
    <section className='introduction1 d-flex align-items-center '>
      <div className='container-fluid'>
        <div className='row'>
        <div className='offset-md-2 col-md-4'>
            <div className='card shadow'>
              <div className='card-body'>
                <img src={sankeydiagram} alt="Sankey Diagram"></img>
              </div>
            </div>
          </div>
          <div className='offset-md-0 col-md-4 content'>
            {/* <div className='card shadow leftcard'>
              <div className='card-body'>
            <h1 className='card-title'></h1>
              </div>
            </div> */}
            <p className='card-text leftcard'> We Have Some Options that are<br></br> healthy comparitively
              the right side sankey diagram shows beverages that are less in calories
            </p>
            <img className='content-img-left' src="../public/arrow.png" alt="Sankey diagram"></img>
          </div>
        </div>
        {/* <div className='row'>
        <div className='offset-md-2 col-md-4 content'>
            <div className='card shadow rightcard'>
              <div className='card-body'>
            <h1 className='card-title'></h1>
              </div>
            </div>
            <p className='card-text rightcard'> We have Some
            Options that are unhealthy comparitively
            the left side sankey diagram shows beverages that are more in calories
            </p>
            <img className='content-img-right' src="../public/arrow.png" alt="Sankey diagram"></img>
        </div>
        <div className='offset-md-0 col-md-4'>
            <div className='card shadow'>
              <div className='card-body'>
                <img src={sankeydiagram} alt="Sankey diagram"></img>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

function Comparison() {
  const [data, setData] = useState([]);
  const [beverageMap, SetFullMap] = useState(new Map());

  const [uniqueBeverageCat, setBeverageCat] = useState(new Set([]));
  const [uniqueBeverage, setUniqueBeverages] = useState(new Set([]));
  const [uniqueBeverageSize, setUniqueBeverageSize] = useState(new Set([]));
  const [uniqueMilkType, setUniqueMilkType] = useState(new Set([]));

  const [selectedBeverageCat, setSelectedBeverageCat] = useState('');
  const [selectedBeverage, setSelectedBeverage] = useState('');
  const [selectedBeverageSize, setSelectedBeverageSize] = useState('');
  const [selectedMilkType, setSelectedMilkType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('../starbucks_drinkMenu_expanded-revised.csv');
        const text = await response.text();
        const parsedData = d3.csvParse(text, d3.autoType);
        setData(parsedData);

        parsedData.forEach(entry => {
          const category = entry.Beverage_category;
          const beverage = entry.Beverage;
          const size = entry.Beverage_size;
          const milkType = entry.Milk_type;
          const nutritionalInfo = {
            Calories: +entry.Calories,
            'Total Fat (g)': +entry['Total Fat (g)'],
            'Trans Fat (g)': +entry['Trans Fat (g)'],
            'Saturated Fat (g)': +entry['Saturated Fat (g)'],
            'Sodium (mg)': +entry['Sodium (mg)'],
            'Total Carbohydrates (g)': +entry['Total Carbohydrates (g)'],
            'Cholesterol (mg)': +entry['Cholesterol (mg)'],
            'Dietary Fibre (g)': +entry['Dietary Fibre (g)'],
            'Sugars (g)': +entry['Sugars (g)'],
            'Protein (g)': +entry['Protein (g)'],
            'Vitamin A (% DV)': entry['Vitamin A (% DV)'],
            'Vitamin C (% DV)': entry['Vitamin C (% DV)'],
            'Calcium (% DV)': entry['Calcium (% DV)'],
            'Iron (% DV)': entry['Iron (% DV)'],
            'Caffeine (mg)': +entry['Caffeine (mg)'],
          };
          
          if (!beverageMap.has(category)) {
            beverageMap.set(category, new Map());
          }
          
          if (!beverageMap.get(category).has(beverage)) {
            beverageMap.get(category).set(beverage, new Map());
          }
          
          if (!beverageMap.get(category).get(beverage).has(size)) {
            beverageMap.get(category).get(beverage).set(size, new Map());
          }
        
          beverageMap.get(category).get(beverage).get(size).set(milkType, nutritionalInfo);

          uniqueBeverageCat.add(category);
          uniqueBeverage.add(beverage);
          uniqueBeverageSize.add(size);
          uniqueMilkType.add(milkType);
        });
        setSelectedBeverageCat(Array.from(uniqueBeverageCat)[0]);
        setSelectedBeverage(Array.from(uniqueBeverage)[0]);
        setSelectedBeverageSize(Array.from(uniqueBeverageSize)[0]);
        setSelectedMilkType(Array.from(uniqueMilkType)[0]);
    };

    fetchData();
    }, []);

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    setSelectedBeverageCat(event.target.value);
    let tempCat = event.target.value;
    let tempbev = beverageMap.get(tempCat).keys().next().value;
    let tempsize = beverageMap.get(tempCat).get(tempbev).keys().next().value;
    let tempmilk = beverageMap.get(tempCat).get(tempbev).get(tempsize).keys().next().value;
    setSelectedBeverage(tempbev);
    setSelectedBeverageSize(tempsize);
    setSelectedMilkType(tempmilk);
  };

  // Function to handle beverage selection
  const handleBeverageChange = (event) => {
    setSelectedBeverage(event.target.value);
    let tempbev = event.target.value;
    let tempsize = beverageMap.get(selectedBeverageCat).get(tempbev).keys().next().value;
    let tempmilk = beverageMap.get(selectedBeverageCat).get(tempbev).get(tempsize).keys().next().value;
    setSelectedBeverageSize(tempsize);
    setSelectedMilkType(tempmilk);
  };

  const handleBeverageSizeChange = (event) => {
    setSelectedBeverageSize(event.target.value);
    let tempsize = beverageMap.get(selectedBeverageCat).get(selectedBeverage).keys().next().value;
    let tempmilk = beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(tempsize).keys().next().value;
    setSelectedMilkType(tempmilk);
  };

  const handleMilkTypeChange = (event) => {
    setSelectedMilkType(event.target.value);
  };


  return (
    <section className='introduction d-flex align-items-center comparison'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='offset-md-1 col-md-10'>
            <div className='card shadow'>
              <div className='card-title'>
              <h1 className='comparision'>Comparision</h1>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-md-3'>
                    <div className="form-group">
                      <label htmlFor="categoryDropdown">Select Beverage Category:</label>
                      <select id="categoryDropdown" className="form-control selct-class" value={selectedBeverageCat} onChange={handleCategoryChange}>
                        {Array.from(uniqueBeverageCat).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-2'>
                    <div className="form-group">
                      <label htmlFor="beverageDropdown">Select Beverage:</label>
                      <select id="beverageDropdown" className="form-control selct-class" value={selectedBeverage} onChange={handleBeverageChange}>
                        {/* <option value="All">Select</option> */}
                        {selectedBeverageCat !== '' && Array.from(beverageMap.get(selectedBeverageCat).keys()).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-2'>
                    <div className="form-group">
                      <label htmlFor="beverageSizeDropdown">Select Beverage Size:</label>
                      <select id="beverageSizeDropdown" className="form-control selct-class" value={selectedBeverageSize} onChange={handleBeverageSizeChange}>
                        {/* <option value="All">Select</option> */}
                        {selectedBeverageCat !== '' && selectedBeverage !== '' && Array.from(beverageMap.get(selectedBeverageCat).get(selectedBeverage).keys()).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-2'>
                    <div className="form-group">
                      <label htmlFor="milkTypeDropdown">Select Milk Type:</label>
                      <select id="milkTypeDropdown" className="form-control selct-class" value={selectedMilkType} onChange={handleMilkTypeChange}>
                      {/* <option value="All">Select</option> */}
                      {selectedBeverageCat !== '' && selectedBeverage !== '' && selectedBeverageSize !== '' && Array.from(beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(selectedBeverageSize).keys()).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className="form-group">
                    <img className='content-img' src="../public/legends.png" alt="cup diagram"></img>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className='row'>
                <div className='col-md-3'>
                  <h5 className='keep-text'>A StarBucks Cup</h5>
                </div>
                <div className='col-md-3'>
                  <h5 className='keep-text'>Nutritional profile</h5>
                </div>
                <div className='col-md-3'>
                  <h5 className='keep-text'>UnHealthy Equivalent options</h5>
                </div>
                <div className='col-md-3'>
                  <h5 className='keep-text'>Healthy Equivalent options</h5>
                </div>
                </div>
                <div className='row'>
                  <div className='col-md-3'>
                    <img className='content-img' src="../public/starbuckscup.png" alt="cup diagram"></img>
                  </div>
                  <div className='col-md-3 drink'>
                    <CustomizeDrinkMake />
                  </div>
                  <div className='col-md-3 tofusss'>
                    <div className='row'>
                      {selectedBeverageCat !== '' && [...Array(Math.ceil(beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(selectedBeverageSize).get(selectedMilkType)['Calories']/20))].map((_, index) => (
                        <div className='col-md-2'>
                          <img className='meldoy-img' src="../public/melody.png" alt="cup diagram"></img>
                        </div>
                      ))}
                    </div>
                    <div className='row'>
                    {selectedBeverageCat !== '' && [...Array(Math.ceil(beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(selectedBeverageSize).get(selectedMilkType)['Sugars (g)']/5))].map((_, index) => (
                        <div className='col-md-2'>
                          <img className='spoon-img' src="../public/sugarspoon.png" alt="cup diagram"></img>
                        </div>
                      ))}
                    </div>
                    <div className='row'>
                    {selectedBeverageCat !== '' && [...Array(Math.ceil(beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(selectedBeverageSize).get(selectedMilkType)['Total Fat (g)']/1))].map((_, index) => (
                        <div className='col-md-2'>
                          <img className='oil-img' src="../public/oilpng2.png" alt="cup diagram"></img>
                        </div>
                      ))}
                    </div>
                    <div className='row'>
                    {selectedBeverageCat !== '' && [...Array(Math.ceil(beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(selectedBeverageSize).get(selectedMilkType)['Protein (g)']/3))].map((_, index) => (
                        <div className='col-md-2'>
                          <img className='tofu-img' src="../public/tofuc.png" alt="cup diagram"></img>
                        </div>
                      ))}
                    </div>
                    <div className='row'>
                    {selectedBeverageCat !== '' && [...Array(Math.ceil(beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(selectedBeverageSize).get(selectedMilkType)['Dietary Fibre (g)']/1))].map((_, index) => (
                        <div className='col-md-2'>
                          <img className='wheat-img' src="../public/wheat1.png" alt="cup diagram"></img>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='col-md-3 tofusss1'>
                    <div className='row'>
                      {selectedBeverageCat !== '' && [...Array(Math.ceil(beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(selectedBeverageSize).get(selectedMilkType)['Calories']/4))].map((_, index) => (
                        <div className='col-md-2'>
                          <img className='staw-img' src="../public/staw2.png" alt="cup diagram"></img>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarbucksChart() {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState(new Map());
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const svgRef = useRef(null);

  // Load data and setup
  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch('../starbucks_drinkMenu_expanded.csv');
          const text = await response.text();
          const parsedData = d3.csvParse(text, d3.autoType);
          // console.log("data loaded", parsedData);
          setData(parsedData);
          const grouped = d3.group(parsedData, d => d.Beverage_category);
          setGroupedData(grouped);
          const categories = Array.from(new Set(parsedData.map(d => d.Beverage_category)));
          setUniqueCategories(categories);
          setSelectedCategory(categories[0]); // Default to first category
      };

      fetchData();
  }, []);

  // Update visualization when category changes
  useEffect(() => {
      if (!selectedCategory || !groupedData.size) return;

      const filteredData = Array.from(groupedData.get(selectedCategory)).sort((a, b) => b.Calories - a.Calories);

      drawChart(filteredData);
  }, [selectedCategory, groupedData]);

  // Function to handle drawing the chart
  const drawChart = (filteredData) => {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear SVG before redrawing

      const margin = { top: 20, right: 30, bottom: 100, left: 200 };
      const height = 500 - margin.top - margin.bottom;
      const barWidth = 20;  // Set a fixed bar width
      const totalWidth = Math.max(800, filteredData.length * (barWidth + 10)) + margin.left + margin.right;
      // const totalWidth = 1000;

      svg.attr('viewBox', `0 0 ${totalWidth} ${520}`);

      const x = d3.scaleLinear()
          .domain([0, filteredData.length])
          .range([margin.left, filteredData.length * (barWidth + 10) + margin.left]);

      const y = d3.scaleLinear()
          .domain([0, d3.max(filteredData, d => d.Calories)])
          .range([height - margin.bottom, margin.top]);

      svg.append("g")
          .attr("fill", '#3d8569')
          .selectAll("rect")
          .data(filteredData)
          .join("rect")
              .attr("x", (d, i) => x(i))
              .attr("y", d => y(d.Calories))
              .attr("height", d => y(0) - y(d.Calories))
              .attr("width", barWidth);

      svg.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x)
              .tickFormat((d, i) => filteredData[i] ? filteredData[i].Beverage + " (" + filteredData[i].Beverage_prep + ")" : "")
              .ticks(filteredData.length))
          .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");

      svg.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y));
  };

  return (
    <section className='introduction1 d-flex align-items-center '>
      <div className='container-fluid'>
        <div className='row'>
          <div className='offset-md-2 col-md-8'>
            <div className='card shadow'>
              <div className='card-title beverage-graph'>
                <h1>Starbucks Beverage Data</h1>
                <select className='selct-class' value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                  {uniqueCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className='card-body'>
                <svg ref={svgRef}></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
}

function CustomizeDrink() {
  const [size, setSize] = useState(1);
  const [activeLayer, setActiveLayer] = useState(null);
  const [layerOptions] = useState([
      ["2% reduced fat", "1% reduced fat", "Soy milk", "Almond milk", "Oat milk"],
      ["Zero Calorie sugar", "Sugar(Normal)", "Honey", "Maple Syrup"],
      ["Coffee Type 1", "Coffee Type 2", "Coffee Type 3"],
      ["Cream", "No Cream"]
  ]);
  const [layerSizeMultipliers, setLayerSizeMultipliers] = useState([1, 1, 1, 1]);
  const canvasRef = useRef(null);

  useEffect(() => {
      drawCanvas();
  }, [size, layerSizeMultipliers]);

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const layers = calculateLayers();
    const clickedLayer = layers.find(layer =>
      x >= layer.left && x <= layer.right && y >= layer.top && y <= layer.bottom
    );

    if (clickedLayer) {
      setActiveLayer(clickedLayer.index);
    } else {
      setActiveLayer(null);
    }
  };

  const handleOptionChange = (event) => {
    if (activeLayer !== null) {
      const newMultipliers = [...layerSizeMultipliers];
      newMultipliers[activeLayer] = parseFloat(event.target.value);
      setLayerSizeMultipliers(newMultipliers);
    }
  };


  const drawCanvas = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const width = 400;
      const height = size * 200;
      canvas.width = width;
      canvas.height = height;

      context.clearRect(0, 0, width, height);
      const layers = calculateLayers();
      layers.forEach(layer => {
        context.fillStyle = layer.color;
        context.beginPath();
        context.moveTo(layer.left, layer.top);
        context.lineTo(layer.right, layer.top);
        context.lineTo(layer.right, layer.bottom);
        context.lineTo(layer.left, layer.bottom);
        context.closePath();
        context.fill();
      });

      const topMostLayer = layers[0];
    const bottomMostLayer = layers[layers.length - 1];

    context.strokeStyle = "rgb(0, 128, 0)";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(topMostLayer.left, topMostLayer.top);
    context.lineTo(topMostLayer.right, topMostLayer.top);
    context.lineTo(bottomMostLayer.right, bottomMostLayer.bottom);
    context.lineTo(bottomMostLayer.left, bottomMostLayer.bottom);
    context.closePath();
    context.stroke();
  };

const calculateLayers = () => {
    const width = 400;
    const height = size * 200;
      const cupWidthTop = 60 * size;
      const cupWidthBottom = 40 * size;
      const cupHeight = 120 * size;
      const cupX = width / 2;
      const cupY = 60;

      const colors = ["grey", "#f5f5dc", "brown", "#fffdd0"];
      const layerHeight = cupHeight / 4;
      const layers = [];

      for (let i = 0; i < 4; i++) {
        const topY = cupY + i * layerHeight;
        const bottomY = topY + layerHeight;
        const topWidth = cupWidthTop - (i * (cupWidthTop - cupWidthBottom) / 4);
        const bottomWidth = topWidth - ((cupWidthTop - cupWidthBottom) / 4);
        layers.push({
          index: i,
          top: topY,
          bottom: bottomY,
          left: cupX - bottomWidth / 2,
          right: cupX + bottomWidth / 2,
          color: colors[i]
        });
      }
      return layers;
    };
  

    return (
      <div>
        <label>Size:</label>
        <select onChange={e => setSize(parseFloat(e.target.value))} value={size}>
          <option value="1">Short</option>
          <option value="1.5">Tall</option>
          <option value="2">Grande</option>
          <option value="2.5">Venti</option>
        </select>
        {activeLayer !== null && (
          <select onChange={handleOptionChange} value={layerSizeMultipliers[activeLayer]}>
            {layerOptions[activeLayer].map((option, index) => (
              <option key={index} value={index + 1}>{option}</option>
            ))}
          </select>
        )}
        <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ border: '1px solid black' }} />
      </div>
    );
  }
  
function CustomizeDrink2() {
  const [size, setSize] = useState(() => parseFloat(localStorage.getItem('drinkSize')) || 1);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = localStorage.getItem('selectedOptions');
    return savedOptions ? JSON.parse(savedOptions) : Array(4).fill(0);
  });
  const [layerOptions] = useState([
      ["None", "2% reduced fat", "1% reduced fat", "Soy milk", "Almond milk", "Oat milk"],
      ["None", "Zero Calorie sugar", "Sugar(Normal)", "Honey", "Maple Syrup"],
      ["None", "Coffee Type 1", "Coffee Type 2", "Coffee Type 3"],
      ["None", "Cream", "No Cream"]
  ]);
  const colors = [
    ["#f0f0f0", "#f8d7da", "#f4c2c2", "#ff6961", "#cb99c9", "#77dd77"],
    ["#f0f0f0", "#fdfd96", "#f49ac2", "#836953", "#779ecb"],
    ["#f0f0f0", "#966fd6", "#ffad60", "#c23b22"],
    ["#f0f0f0", "#d3d3d3", "#fff44f"]
  ];
  const canvasRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('drinkSize', size.toString());
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    drawCanvas();
  }, [size, selectedOptions]);

  const handleSelectionChange = (layerIndex, event) => {
    const newOptions = [...selectedOptions];
    newOptions[layerIndex] = parseInt(event.target.value, 10);
    setSelectedOptions(newOptions);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = 400;
    const height = 500;  // Set a fixed canvas height
    canvas.width = width;
    canvas.height = height;

    context.clearRect(0, 0, width, height);

    // Adjust the cup dimensions based on size
    const scale = 0.75 + 0.25 * size; // Scale ranges from 1.0 to 1.5
    const cupWidthTop = 180 * scale; // Base width at the top of the cup
    const cupWidthBottom = 120 * scale; // Base width at the bottom of the cup
    const cupHeight = 280 * scale; // Height of the cup
    const cupX = width / 2;
    const cupY = height - cupHeight - 50; // Ensure there's space at the bottom

    // Draw the cup outline
    
    const taperFactor = 2;

    // Filling the layers inside the cup
    // const layerHeight = cupHeight / layerOptions.length;
    // for (let i = 0; i < selectedOptions.length; i++) {
    //   if (selectedOptions[i] > 0) {
    //     const topY = cupY + i * layerHeight;
    //     const layerWidthTop = cupWidthTop - (cupWidthTop - cupWidthBottom) * (i / layerOptions.length)- taperFactor * i * scale;
    //     context.fillStyle = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c"][i];
    //     context.fillRect(cupX - layerWidthTop / 2, topY, layerWidthTop, layerHeight);
    //   }
    // }

    const layerHeight = cupHeight / layerOptions.length;
    selectedOptions.forEach((option, index) => {
      const topY = cupY + index * layerHeight;
      context.fillStyle = colors[index][option]; // Assign color per layer
      context.fillRect(cupX - cupWidthTop / 2, topY, cupWidthTop, layerHeight);
    });
    context.beginPath();
    context.lineWidth = 10;
    context.moveTo(cupX - cupWidthTop / 2, cupY);
    context.lineTo(cupX + cupWidthTop / 2, cupY);
    context.lineTo(cupX + cupWidthBottom / 2, cupY + cupHeight);
    context.lineTo(cupX - cupWidthBottom / 2, cupY + cupHeight);
    context.closePath();
    context.stroke();

  };

  return (
    <div>
      <h1>Customize Your Drink</h1>
      {layerOptions.map((options, index) => (
        <div key={index}>
          <h3>Layer {index + 1}</h3>
          <select value={selectedOptions[index]} onChange={(e) => handleSelectionChange(index, e)}>
            {options.map((option, optionIndex) => (
              <option key={optionIndex} value={optionIndex}>{option}</option>
            ))}
          </select>
        </div>
      ))}
      <div>
        <label>Size:</label>
        {["1", "1.5", "2", "2.5"].map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="size"
              value={option}
              checked={parseFloat(size) === parseFloat(option)}
              onChange={(e) => setSize(parseFloat(e.target.value))}
            />
            {option === "1" ? "Short" : option === "1.5" ? "Tall" : option === "2" ? "Grande" : "Venti"}
          </label>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ border: '1px solid black', marginTop: '20px' }} />
    </div>
  );
}

function LayoutComponent() {
  return (
      <section className='introduction1 d-flex align-items-center '>
          <div className='container-fluid'>
              <div className='row'>
                  <div className='offset-md-1 col-md-5'>
                      <div className='card shadow'>
                          <div className='card-body'>
                              <CustomizeDrink2 />
                          </div>
                      </div>
                  </div>
                  <div className='col-md-5 offset-md-0'>
                      <div className='card shadow'>
                          <div className='card-body'>
                            <h1 className='card-title'>Equivalent to</h1>
                            <p className='card-text'>
                              unhealthy options
                            </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}

function CustomizeDrinkMake() {
  // const [size, setSize] = useState(() => parseFloat(localStorage.getItem('drinkSize')) || 1);
  // const [selectedOptions, setSelectedOptions] = useState(() => {
  //   const savedOptions = localStorage.getItem('selectedOptions');
  //   return savedOptions ? JSON.parse(savedOptions) : Array(5).fill(0);
  // });
  const selectedOptions = [1,2,3,4,5];
  const size = 5;
  const colors = [
    "#663300", "#964B00", "#B25900", "#C7762C", "#DE924F"
  ];
  const canvasRef = useRef(null);
  useEffect(() => {
    drawCanvas();
  },);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = 300;
    const height = 240;
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    const scale = 0.75 + 0.25 * size; // Scale ranges from 1.0 to 1.5
    const cupWidthTop = 90 * scale; // Base width at the top of the cup
    const cupWidthBottom = 50 * scale; // Base width at the bottom of the cup
    const cupHeight = 100 * scale; // Height of the cup
    const cupX = width / 2;
    const cupY = height - cupHeight - 50; // Ensure there's space at the bottom
    const taperFactor = 2;
    const layerHeight = cupHeight / 5;
    selectedOptions.forEach((option, index) => {
      const topY = cupY + index * layerHeight;
      const layerWidthTop = cupWidthTop - (cupWidthTop - cupWidthBottom) * (index / 5)- taperFactor * index * scale;
      context.fillStyle = colors[index]; // Assign color per layer
      context.fillRect(cupX - layerWidthTop / 2, topY, layerWidthTop, layerHeight);
      // console.log(index);
    });
    context.beginPath();
    context.lineWidth = 10;
    context.moveTo(cupX - cupWidthTop / 2, cupY);
    context.lineTo(cupX + cupWidthTop / 2, cupY);
    context.lineTo(cupX + cupWidthBottom / 2, cupY + cupHeight);
    context.lineTo(cupX - cupWidthBottom / 2, cupY + cupHeight);
    context.closePath();
    context.stroke();

  };
  

  return (
    <canvas ref={canvasRef}/>
  );
}


function Documentation() {
  return (
    <section className='Documentation d-flex justify-content-center align-items-center vh-100'>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='offset-md-1 col-md-8'>
            <div className='card shadow'>
              <div className='card-body'>
                <h3 className='card-title'>Introduction</h3>
                <h6>Jennie, a Starbucks enthusiast, is currently on a diet. She wishes to check the nutritional information prior to ordering her beverage.
                  Given that she typically customizes her drink, relying solely on the app is insufficient for her needs.
                  The current Starbucks menu only shows the total calorie per drink, helpful for controlling calorie intake but lacking depth in terms of comprehensive nutritional facts crucial for maintaining a healthy lifestyle.
                  Moreover, the standard menu presentations fail to account for variations attributable to customizable options, such as differing milk choices, presenting a significant information gap for people seeking to make informed dietary choices.
                  In response to this gap, we aim to build a tool for visualizing the nutritional facts of Starbucks drinks to enhance consumer awareness and empower people with the knowledge to make healthier choices.
                </h6>
              </div>
            </div>
          </div>
          <div className='offset-md-2 col-md-8'>
            <div className='card shadow'>
              <div className='card-body'>
                <h3 className='card-title'>Related Work</h3>
                <h6>< a href="https://rpubs.com/saravargha/starbucks">rpubs.com</a>
                  <div><a href="https://mavenanalytics.io/project/730">mavenalytics.io</a></div>
                  <a href="https://medium.com/@olgakhvan/unleashing-starbucks-nutritional-contents-interactive-data-visualization-9b90f8145ab8">starbucks-interactive-data</a>
                </h6>
              </div>
            </div>
          </div>
          <div className='offset-md-3 col-md-8'>
            <div className='card shadow'>
              <div className='card-body'>
                <h3 className='card-title'>Methodology</h3>
                <h6>
                  I have made changes to my dataset to accomodate cup sizes.
                  After exploratory analysis, I found that few beverages have incomplete nutritional profile and I filled those details using Google.
                </h6>
              </div>
            </div>
          </div>
          < div className='offset-md-4 col-md-8'>
            < div className='card shadow'>
              <div className='card-body'>
                <h3 className='card-title'>Design</h3>
                <h6>
                  We wanted to let the users know about the nutritional profile of the existing beverages. So we opted for Sankey diagrams to display the calories in each layer of every beverage
                  Additionally, we also wanted to give the user his/her own choice of customizing their drink, so we opted for the cup design where dropdown values allow users to choose ingredients. To make sure the customer makes an informed decision, we display the equivalent healthy options.

                </h6>
              </div >
            </div >
          </div >
          <div className='offset-md-3 col-md-8'>
            <div className='card shadow'>
              <div className='card-body'>
                <h3 className='card-title'>Implementation</h3>
                <h6>
                  I have used ReactJs combined with D3.js for visualization
                </h6>
              </div>
            </div>
          </div>
          <div className='offset-md-2 col-md-8'>
            <div className='card shadow'>
              <div className='card-body'>
                <h3 className='card-title'>Discussion</h3>
                <h6>The visualization allows users to understand the calories and contents of beverages. It is surprising to see how many calories are present in a small layer of cream as opposed to a big layer of coffee. I believe this helps the users make an educated decision about their consumption.

                </h6>
              </div>
            </div>
          </div>
          <div className='offset-md-1 col-md-8'>
            <div className='card shadow'>
              <div className='card-body'>
                <h3 className='card-title'>Future Work</h3>
                <h6>I hope to expand the visualization showing the user about healthy equivalent values. I hope to refine this visualization a lot more.</h6>
                <h4></h4>
              </div>
            </div>
          </div>
        </div >
      </div >
    </section >
  )
}
