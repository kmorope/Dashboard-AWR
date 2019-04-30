import {
  inject
} from 'aurelia-framework';
import * as d3 from 'd3';


export class Overview {

  constructor() {}

  attached() {
    this.initializeChart();
  }

  initializeChart() {
    // Data
    const dataset1 = JSON.parse('[73.76485163027888,88.14314869551498,60.07160491671124,78.05917782144006,92.84690323913051,87.77022060741578,87.65266340207693,52.02965719713634,65.8700937116689,63.143085790431606,77.51285081290519,89.47117627132704,99.27408547811402,87.99858960412732,83.66506795366232,88.53211932576345,99.5094600639527,56.66014023625252,67.6995830391757,63.998180923002366,66.51164077564725,80.16849630600868,55.973509828607725,94.88309818299956,70.24926011032275,89.2774150560498,89.00381706016418,91.0780470510668,82.05933734906436]');
    const dataset2 = JSON.parse('[80.73618473493161,88.05885666592522,98.7048816420985,74.79973316682464,67.254335813292,62.44722842133699,83.80271025274195,88.44556972808486,63.0330640574728,85.08327811406141,92.09447015491307,75.88646047806537,60.131218776193876,82.48795809853172,89.45430727528588,97.87417843831301,76.14124806290442,55.89406081061487,91.85792353943552,99.44041241846986,73.81760885821723,63.59228062243233,52.21401593797178,64.1732245543982,70.2075416481421,76.5982175249886,72.04620658856541,62.25888013762293,86.50173611465081]');
    const dataset3 = JSON.parse('[11.6309347140356367,35.6430965753907,9.746423099201152,39.98647515573946,17.98027613743821,3.486469410501858,45.072967972773256,43.19067593266349,43.64312238338458,2.6638327695559627,35.49974849768752,37.76264997103447,5.305161811793269,26.743664290160083,28.447241277111203,7.442892296100901,36.07707697281577,9.159932090281785,26.74222560898597,13.918782227917227,33.00857048879784,28.656977770686787,23.286804306942678,39.61776395294071,19.231098301010363,36.82031101548148,14.719176547755753,2.399024152359308,20.279515765680955]');
    const dataset4 = JSON.parse('[12.5804864395190799,4.423716487585305,44.38469228742593,22.464681279568754,49.29188761696336,20.831848000831187,22.973913573390824,47.18320458242374,47.720363830206416,26.97593329221013,13.49367755618619,34.250680716061055,41.70916366924611,47.067658950647925,37.06380506433143,43.79930466097505,26.400890061824867,30.64057803574093,29.635152109799357,47.80675224987022,14.875293828279634,2.7155919318852195,14.426866016353923,31.575105367917477,45.194747660107005,29.393420628430455,24.844235497150446,3.6585916851372025,38.88205391627133]');

    const margin = {
        top: 50,
        right: 0,
        bottom: 50,
        left: 80
      },
      width = window.innerWidth - margin.left - margin.right,
      height = 240

    const addDays = (date, days) => {
      const d = new Date(date.valueOf());
      d.setDate(d.getDate() + days);
      return d;
    }

    const n = 29;
    const firstDate = new Date(2018, 0, 10);
    const lastDate = addDays(firstDate, 28);
    const todayDate = new Date(2018, 0, 18);
    const gridColor = '#8D98A2';
    const gridlineColor = '#E7ECF1';

    // Scales
    const xScale = d3.scaleTime()
      .domain([firstDate, lastDate])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100]) // input 
      .range([height, 0]); // output 

    // Line generator
    const line = d3.line()
      .x(function (d, i) {
        return xScale(d.x);
      })
      .y(function (d) {
        return yScale(d.y);
      })
      .curve(d3.curveCatmullRom)

    const getDataset = (ds) => d3.range(n).map(function (d) {
      return {
        "y": ds[d],
        "x": addDays(firstDate, d)
      }
    });

    const svg = d3.select(".bar-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X Axis
    const formatTimeXSameMonth = d3.timeFormat("%B %e");
    const formatTimeX = d3.timeFormat("%b %e");
    const formatX = (d) => {
      const left = addDays(d, -3);
      const right = addDays(d, 3);
      if (left.getMonth() === right.getMonth()) {
        return formatTimeXSameMonth(left) + ' - ' + right.getDate()
      } else {
        return formatTimeX(left) + ' - ' + formatTimeX(right)
      }
    };
    const xAxis = d3.axisBottom(xScale)
      .tickValues([addDays(firstDate, 3),
        addDays(firstDate, 10),
        addDays(firstDate, 17),
        addDays(firstDate, 24)
      ])
      .tickFormat(formatX);
    const customX = (g) => {
      g.call(xAxis);
      g.select(".domain").remove();
      g.selectAll('.tick line').remove();
      g.selectAll('.tick text').attr('fill', gridColor)
    }
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + (width * 0.02) + "," + (height + 6) + ")")
      .call(customX);

    const gridlinesXAxis = () => d3.axisBottom(xScale).tickValues([
      addDays(firstDate, 0),
      addDays(firstDate, 7),
      addDays(firstDate, 14),
      addDays(firstDate, 21),
      addDays(firstDate, 28)
    ]);
    const gridlinesX = (g) => {
      g.call(gridlinesXAxis()
        .tickSize(-height - margin.top - 40)
        .tickFormat(""));
      g.select(".domain").remove();
      g.selectAll('.tick text').remove();
      g.selectAll('.tick line').attr('stroke', gridlineColor)
    }
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + (height + margin.top - 10) + ")")
      .attr("stroke", gridColor)
      .call(gridlinesX);

    // Y Axis
    const yAxis = d3.axisLeft(yScale)
      .tickValues([0, 25, 50, 75, 100])
      .tickFormat(d => d + '%');

    const customY = (g) => {
      g.call(yAxis)
      g.select(".domain").remove();
      g.selectAll('.tick line').remove();
      g.selectAll('.tick text').attr('fill', gridColor).attr('x', -43)
    }
    svg.append("g")
      .attr("class", "y axis")
      .call(customY);

    const gridlinesYAxis = () => d3.axisRight(yScale).tickValues([0]);
    const gridlinesY = (g) => {
      g.call(gridlinesYAxis()
        .tickFormat("")
        .tickSize(width + margin.right + margin.left));
      g.select(".domain").remove();
      g.selectAll('.tick text').remove();
      g.selectAll('.tick line').attr('stroke', gridlineColor)
    }
    svg.append("g")
      .attr("class", "grid")
      .call(gridlinesY);

    // Draw line 
    const getPastDataset = (ds) => ds.filter(d => d.x <= todayDate);
    const getFutureDataset = (ds) => {
      const past = getPastDataset(ds);
      return [past[past.length - 1]].concat(ds.filter(d => d.x > todayDate));
    }

    const useDataset = (dataset, cssClass) => {
      const pastDataset = getPastDataset(dataset);
      const futureDataset = getFutureDataset(dataset);

      svg.append("path")
        .attr("class", "line " + cssClass)
        .attr("d", line(pastDataset));

      return svg.append("path")
        .attr("class", "line dashed " + cssClass)
        .attr("d", line(futureDataset));
    }

    const interestLine = useDataset(getDataset(dataset1), 'interest');
    const strengthLine = useDataset(getDataset(dataset3), 'strength');

    const animate = (n) => {
      const interestDs = getFutureDataset(getDataset(n === 1 ? dataset1 : dataset2));
      interestLine.transition().ease(d3.easeQuad).duration(1000).attr("d", line(interestDs));

      const strengthDs = getFutureDataset(getDataset(n === 1 ? dataset3 : dataset4));
      strengthLine.transition().ease(d3.easeQuad).duration(1000).attr("d", line(strengthDs));
    }

    // Draw today
    const todayX = xScale(todayDate);
    svg.append("line")
      .attr("x1", todayX)
      .attr("y1", 70 - margin.top)
      .attr("x2", todayX)
      .attr("y2", height)
      .attr("class", "today");
    svg.append("line")
      .attr("x1", todayX)
      .attr("y1", -margin.top)
      .attr("x2", todayX)
      .attr("y2", 30 - margin.top)
      .attr("class", "today");
    svg.append("text")
      .text('Today')
      .attr("class", "today-text")
      .attr('x', todayX)
      .attr('y', 50 - margin.top)
      .attr('alignment-baseline', 'central');;

    // Center Y Axis
    const centerY = yScale(50);
    svg.append("line")
      .attr("x1", 0)
      .attr("y1", centerY)
      .attr("x2", width - 170)
      .attr("y2", centerY)
      .attr("class", "center-y");
    svg.append("line")
      .attr("x1", width - 30)
      .attr("y1", centerY)
      .attr("x2", width)
      .attr("y2", centerY)
      .attr("class", "center-y");
    svg.append("text")
      .text('HEALTHY TARGET')
      .attr("class", "center-text")
      .attr('x', width - 100)
      .attr('y', centerY)
      .attr('alignment-baseline', 'central');
  }
}
