import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
 // left image (girl in yellow)
 // right image (girl in floral)
 // center chat UI

const chatTypes = ['Hostel Chat', 'City Chat', 'Direct Messages'];

function ChatIntroSection() {
  const controls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      controls.start({ y: -index * 160 }); // move images up/down
      textControls.start({ y: -index * 24 }); // move text
      index = (index + 1) % chatTypes.length;
    }, 3000);
    return () => clearInterval(interval);
  }, [controls, textControls]);

  return (
    <section className="bg-white py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left image */}
        <motion.div className="w-1/4 hidden md:block" animate={controls} transition={{ duration: 0.8 }}>
          <img src='https://roomraccoon.com/wp-content/uploads/2023/04/Hostal-Instagram.png' alt="Left person" className="rounded-2xl shadow-lg w-full mb-4" />
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5KOcQF_IxuGaNF7lSbL_XCd_07y8AJKKftlD5voK46xLa6Cq9Q73SByWFa_FSJ6oQqn4&usqp=CAU' alt="Alt person" className="rounded-2xl shadow-lg w-full" />
        </motion.div>

        {/* Center Chat Mockup */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-center mb-4">
            Say <span className="text-purple-600">hello</span> <br />
            <span className="text-black">(before you go!)</span>
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Plan a meal with new friends, or gather a crew for a game of beach volleyball!
          </p>
          <img src='https://in.pro.infinixmobility.com/media/catalog/product/x/6/x6532_smart_9_base1_3_2_1.png' alt="Chat mockup" className="w-[90%] max-w-sm rounded-xl shadow-xl" />
        </div>

        {/* Right Text Slider */}
        <div className="hidden md:block w-1/4 text-sm font-medium text-gray-400 relative">
          <div className="h-[72px] overflow-hidden">
            <motion.div animate={textControls} transition={{ duration: 0.8 }} className="space-y-6">
              {chatTypes.map((text, idx) => (
                <div key={idx} className={`pl-6 relative ${idx === 1 ? 'text-purple-700 font-bold' : ''}`}>
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-gray-300" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatIntroSection;
