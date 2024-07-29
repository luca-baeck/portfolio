import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Algorithms.scss';

const Algorithms = () => {
    const algorithms = ['Bubble Sort Check', 'Bubble Sort Simple', 'Insertion Sort', 'Selection Sort'];
    const [activeAlgorithm, setActiveAlgorithm] = useState('Bubble Sort Check');
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    var stopSort = false;
    var sorting = false;
    var array = [];
    var [maxValue, setMaxValue] = useState(100);
    var [speed, setSpeed] = useState(10);
    var [size, setSize] = useState(20);

    function resetArray() {
        const a = [];
        for(let i = 0; i < size; i++) {
            a.push(randomInt(1, maxValue));
        }
        array = a;
    }

    resetArray();

    const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
    };


    function bubbleSortCheck() {
        var animations = [[]];
        var i = array.length;
        var swapped = false;

        do {
            swapped = false;

            for (let j = 0; j < i - 1; j++) {
                var newComparison = {type: 'compare', i: j, j: j+1};
                animations.push(newComparison);
                if (array[j] > array[j + 1]) {
                    //swap
                    let x = array[j];
                    array[j] =array[j+1];
                    array[j+1] = x;

                    swapped = true;
                    var newSwap = {type: 'swap', i: j, j: j+1};
                    animations.push(newSwap);
                }else {
                    var newNoSwap = {type: 'noswap', i: j, j: j+1};
                    animations.push(newNoSwap);
                }
            }
            i--;
        }
        while (swapped);
        return animations;
    }

    function bubbleSortSimple() {
        var animations = [[]];
        for (let i = array.length; i > 0; i--) {
            for (let j = 0; j < i - 1; j++) {
              var newComparison = {type: 'compare', i: j, j: j+1};
              animations.push(newComparison);
              if (array[j] > array[j + 1]) {
                //swap
                let x = array[j];
                array[j] =array[j+1];
                array[j+1] = x;
                var newSwap = {type: 'swap', i: j, j: j+1};
                animations.push(newSwap);
              }else {
                var newNoSwap = {type: 'noswap', i: j, j: j+1};
                animations.push(newNoSwap);
                }
            }
        }
        return animations;
    }

    function insertionSort() {
        var animations = [[]];
        for(let i = 1; i < array.length; i++) {
            let j = i;
            let x = array[i];
            while(j > 0 && array[j-1] > x) {
                var newComparison = {type: 'compare', i: j-1, j: j};
                animations.push(newComparison);
                var newComparisonTrue = {type: 'swap', i: j-1, j: j};
                animations.push(newComparisonTrue);
                array[j] = array[j-1];
                j = j-1;

            }
            var newComparisonFalse = {type: 'compareFalse', i: 0, j: i};
            animations.push(newComparisonFalse);
            array[j] = x;
        }
        return animations;
    }

    function mergeSort() {

    }

    function quickSort() {

    }
    
    function selectionSort() {
        var animations = [[]];
        for(let i = 0; i < array.length - 1; i++) {
            let m = i;
            for(let j = i + 1; j < array.length; j++) {
                var newComparison = {type: 'compare', i: m, j: j};
                animations.push(newComparison);
                if(array[j] < array[m]) {
                    var newResultFound = {type: 'found', i: m, j: j};
                    animations.push(newResultFound);
                    m = j;
                }else {
                    var newResultNotFound = {type: 'notfound', i: m, j: j};
                    animations.push(newResultNotFound);
                }
            }
            //swap
            let x = array[i];
            array[i] =array[m];
            array[m] = x;
            var newSwap = {type: 'swap', i: i, j: m};
            animations.push(newSwap);
            
        }
        return animations;
    }

    function playPause() {
        if(sorting) {
            stopSort = true;
            resetBars();
            document.getElementById(activeAlgorithm).click();
        }else{
            document.getElementById('start').innerHTML = 'Stop';
            handleAnimations();
        }
    }

    async function handleInsertionSortAnimation(animations) {
        var bars = document.getElementsByClassName('bars');
        for(let k = 1; k < animations.length; k++) {
            if(stopSort) {
                stopSort = false;
                sorting = false;
                document.getElementById('start').innerHTML = 'Start';
                return;
            }
            var cur = animations[k];
            var lastAnimation = animations[k-1];
            if(k === 1) {
                lastAnimation = animations[1];
            }  
            if(cur.type === 'compare') {
                //reset old result and start new
                //reset last one


                
                //compare
                var a = bars[cur.i];
                var b = bars[cur.j];
                
                if(lastAnimation.type === 'compareFalse') {
                    resetBars()
                }
                b.style.background = '#A8A8A8';
                a.style.background = '#8024c4';
            }else {
                if(cur.type === 'swap') {
                    //swap
                    a = bars[cur.i];
                    b = bars[cur.j];
                    var x = a.style.height;
                        
                    a.style.height = b.style.height;
                    b.style.height = x;

                    var s = a.children[0].innerHTML;
                    a.children[0].innerHTML = b.children[0].innerHTML;
                    b.children[0].innerHTML = s;

                    a.style.background = '#A8A8A8';
                    b.style.background = '#3CB371';

                }else if(cur.type === 'compareFalse') {
                    for(let i = 0; i <= cur.j; i++) {
                        bars[i].style.background = '#3CB371';
                    }
                }
            }
            await sleep(1300 - 50 * speed);
        }
        animationEnd();
    }

    async function handleSelectionSortAnimation(animations) {
        var bars = document.getElementsByClassName('bars');
        for(let k = 1; k < animations.length; k++) {
            if(stopSort) {
                stopSort = false;
                sorting = false;
                document.getElementById('start').innerHTML = 'Start';
                return;
            }
            var cur = animations[k];
            var lastAnimation = animations[k-1];
            if(k === 1) {
                lastAnimation = animations[1];
            }  
            if(cur.type === 'compare') {
                //reset old result and start new
                //reset last one
                var a = bars[lastAnimation.i];
                var b = bars[lastAnimation.j];
                if(!lastAnimation.type === 'swap'){
                    a.style.background = '#647295';
                }
                if(lastAnimation.i === lastAnimation.j) {
                    b.style.background = '#3CB371';
                }else{
                    b.style.background = '#647295';
                }
                

                
                //compare
                a = bars[cur.i];
                b = bars[cur.j];
                a.style.background = '#A8A8A8';
                b.style.background = '#8024c4';
            }else {
                if(cur.type === 'swap') {
                    //swap
                    bars[lastAnimation.j].style.background = '#647295';
                    a = bars[cur.i];
                    b = bars[cur.j];
                    var x = a.style.height;
                        
                    a.style.height = b.style.height;
                    b.style.height = x;

                    var s = a.children[0].innerHTML;
                    a.children[0].innerHTML = b.children[0].innerHTML;
                    b.children[0].innerHTML = s;

                    
                    b.style.background = '#647295';
                    a.style.background = '#3CB371';

                }else if(cur.type === 'found') {
                    a = bars[cur.i];
                    b = bars[cur.j];
                    a.style.background = '#647295';
                    b.style.background = '#3CB371';
                }else if(cur.type === 'notfound') {
                    a = bars[cur.i];
                    b = bars[cur.j];
                    a.style.background = '#A8A8A8';
                    b.style.background = '#DC143C';
                }
            }
            await sleep(1300 - 50 * speed);
        }
        animationEnd();
    }

    async function handleBubbleSortAnimation(animations) {
        let counter = array.length-1;
        var roundEnd = false;
        var bars = document.getElementsByClassName('bars');
        for(let k = 1; k < animations.length; k++) {
            if(stopSort) {
                stopSort = false;
                sorting = false;
                document.getElementById('start').innerHTML = 'Start';
                return;
            }
            var cur = animations[k];
            var lastAnimation = animations[k-1];
            if(k === 1) {
                lastAnimation = animations[1];
            }  
            if(cur.type === 'compare') {
                //reset old result and start new
                //reset last one
                var a = bars[lastAnimation.i];
                var b = bars[lastAnimation.j];
                a.style.background = '#647295';
                if(!roundEnd){
                    b.style.background = '#647295';
                }
                
                //compare
                a = bars[cur.i];
                b = bars[cur.j];
                a.style.background = '#8024c4';
                b.style.background = '#8024c4';
            }else {
                if(cur.type === 'swap') {
                    //swap
                    a = bars[cur.i];
                    b = bars[cur.j];
                    var x = a.style.height;
                        
                    a.style.height = b.style.height;
                    b.style.height = x;

                    var s = a.children[0].innerHTML;
                    a.children[0].innerHTML = b.children[0].innerHTML;
                    b.children[0].innerHTML = s;

                    a.style.background = '#DC143C';
                    b.style.background = '#DC143C';

                }else if(cur.type === 'noswap') {
                    a = bars[cur.i];
                    b = bars[cur.j];
                    a.style.background = '#3CB371';
                    b.style.background = '#3CB371';
                }
            }
            if(lastAnimation.j === counter) {
                counter--;
                bars[lastAnimation.j].style.background = '#3CB371';
                roundEnd = true
            }
            await sleep(1300 - 50 * speed);
        }
        animationEnd();
    }

    async function animationEnd() {
        var bars = document.getElementsByClassName('bars');
        for(let i = 0; i < array.length; i++) {
            bars[i].style.background = '#3CB371';
        }
        stopSort = false;
        sorting = false;
        document.getElementById('start').innerHTML = 'Start';
    }

    async function handleAnimations() {
        stopSort = false;
        sorting = true;
        resetBars();
        var animations = [[]];
        if(activeAlgorithm === 'Bubble Sort Check') {
            animations = bubbleSortCheck();
            handleBubbleSortAnimation(animations);
        }else if(activeAlgorithm === 'Bubble Sort Simple') {
            animations = bubbleSortSimple();
            handleBubbleSortAnimation(animations);
        }else if(activeAlgorithm === 'Insertion Sort') {
            animations = insertionSort();
            handleInsertionSortAnimation(animations);
        }else if(activeAlgorithm === 'Merge Sort') {
            animations = mergeSort();
        }else if(activeAlgorithm === 'Quick Sort') {
            animations = quickSort();
        }else if(activeAlgorithm === 'Selection Sort') {
            animations = selectionSort();
            handleSelectionSortAnimation(animations);
        }
    }

    function resetBars() {
        var bars = document.getElementsByClassName('bars');
        for(let i = 0; i < array.length; i++) {
            bars[i].style.background = '#647295';
        }
    }
  
    const handleAlgorithmsFilter = (item) => {
      resetBars();
      setActiveAlgorithm(item);
      setAnimateCard([{ y: 100, opacity: 0 }]);
  
      setTimeout(() => {
        setAnimateCard([{ y: 0, opacity: 1 }]);
      }, 500);
    };

  return (
    <>
    <h2 className="head-text"><span>Algorithms</span> </h2>

    <div className="app__algorithms-filter" >
      {algorithms.map((item, index) => (
        <div
          key={index}
          id={item}
          onClick={() => {
            handleAlgorithmsFilter(item);
            resetArray();
            resetBars();
            stopSort = true;
          }}
          className={`app__algorithms-filter-item app__flex p-text ${activeAlgorithm === item ? 'item-active' : ''}`}
        >
          {item}
        </div>
      ))}
    </div>

    <motion.div
      animate={animateCard}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__algorithms-portfolio"
    >
        {array.map((value, index) => (
            <div className='app__flex bars' key={index} style={{height: `${(value/100) * 60}vh`, width: `${((80 - 0.1*2*size)/size)}vw`, transition: `all ${(1250 - 50 * speed)/1000}s linear`, background: '#647295'}}>
                <p className='app__flex'>{value}</p>
            </div>
        ))}

    </motion.div>

    <div className='app_algorithms-start'>
        <div className='app_algorithms-setting' onClick={(e) => {
                document.getElementById(activeAlgorithm).click();
                resetBars();
            }}>
                <p className='p-text app__flex'>Reset Array</p>
        </div>
        <div className='app_algorithms-setting' onClick={(e) => {
                playPause();
            }}>
                <p className='p-text app__flex ' id='start'>Start</p>
        </div>
    </div>


    <div className='app__algorithms-settings app__flex'>
        <div className='app_algorithms-setting'>
            <p className='p-text app__flex'>max Value</p>
            <input type="range" min="1" max="100" value={maxValue} className='app__flex p-text'
                onInput={(e) => {
                    setMaxValue(e.target.value);
                    document.getElementById('maxValue').innerHTML = e.target.value;
                    resetArray();
                    resetBars();
                    stopSort = true;
                }}
                
            ></input>
            <p id='maxValue' className='p-text app__flex'>{maxValue}</p>
        </div>
        <div className='app_algorithms-setting'>
            <p className='p-text app__flex'>Size</p>
            <input type="range" min="1" max="100" value={size} className='app__flex p-text'
                onInput={(e) => {
                    setSize(e.target.value);
                    document.getElementById('size').innerHTML = e.target.value;
                    resetArray();
                    resetBars();
                    stopSort = true;
                }}
            ></input>
            <p id='size' className='p-text app__flex'>{size}</p>
        </div>
        <div className='app_algorithms-setting'>
            <p className='p-text app__flex'>Speed</p>
            <input type="range" min="1" max="25" value={speed} className='app__flex p-text'
                onInput={(e) => {
                    setSpeed(e.target.value);
                    document.getElementById('speed').innerHTML = e.target.value;
                    resetBars();
                    stopSort = true;
                }}
            ></input>
            <p id='speed' className='p-text app__flex'>{speed}</p>
        </div>
    </div>
  </>
  );

};

export default AppWrap(
  MotionWrap(Algorithms, 'app__algorithms'),
  'algorithms',
  'app__whitebg',
);

//min max included
function randomInt(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}