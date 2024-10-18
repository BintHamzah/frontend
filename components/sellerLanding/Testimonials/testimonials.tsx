import Image from "next/legacy/image";
import Styles from "./testimonials.module.scss";

import Switcher from "./Switcher";

const Testimonials = () => {
  const slides = [
    {
      element: (
        <>
          <div className='tw-flex tw-relative'>
            <Image
              className='circle-image'
              src='/images/testimonial-man.png'
              height='70'
              width='70'
            />
            <div className='tw-flex tw-flex-col tw-justify-center tw-items-left tw-ml-3'>
              <h3 className='tw-text-base md:tw-text-lg tw-text-gray-kwek200'>James Mathew</h3>
              <h4 className='tw-text-sm md:tw-text-lg'>Customer</h4>
            </div>
            <div className='tw-absolute tw-right-1'>
              <img src='/images/quote.png' className='tw-w-10' />
            </div>
          </div>
          <div>
            <h3 className='  xl:tw-line-clamp-none tw-text-gray-kwek200 tw-opacity-70 tw-text-sm md:tw-text-lg tw-mt-6'>
              &ldquo;Great experience shopping with you! The process was smooth, delivery was fast,
              and my order arrived exactly as described. I will definitely shop here again and
              recommend to others!&ldquo;
            </h3>
          </div>
          {/* <div className='tw-absolute tw-bottom-[5%]  md:tw-bottom-[10%] '>
            <img className='tw-h-5' src='/svg/FedEx-Logo.svg' />
          </div> */}
        </>
      ),
    },
    {
      element: (
        <>
          <div className='tw-flex tw-relative'>
            <Image
              className='circle-image'
              src='/images/testimonial-man.png'
              height='70'
              width='70'
            />
            <div className='tw-flex tw-flex-col tw-justify-center tw-items-left tw-ml-3'>
              <h3 className='tw-text-base md:tw-text-lg tw-text-gray-kwek200'>Grego</h3>
              <h4 className='tw-text-sm md:tw-text-lg'>Developer</h4>
            </div>
            <div className='tw-absolute tw-right-1'>
              <img src='/images/quote.png' className='tw-w-10' />
            </div>
          </div>
          <div>
            <h3 className='  xl:tw-line-clamp-none tw-text-gray-kwek200 tw-opacity-70 tw-text-sm md:tw-text-lg tw-mt-6'>
              &ldquo;I had a great experience shopping on this website. The layout is super easy to
              navigate, and I found exactly what I was looking for without any hassle. The product
              pages are detailed, and the photos make it easy to see what you’re getting, which is
              always a plus.&ldquo;
            </h3>
          </div>
          {/* <div className='tw-absolute tw-bottom-[5%]  md:tw-bottom-[10%]'>
            <img className='tw-h-5' src='/svg/FedEx-Logo.svg' />
          </div> */}
        </>
      ),
    },
  ];
  return (
    <div className={Styles.testimonials}>
      <div className={Styles.testimonialsAssurance}>
        <div className='tw-mx-2 md:tw-mx-10 lg:tw-mx-24 tw-text-center md:tw-text-left'>
          <h3 className='tw-text-white-100 tw-font-semibold tw-text-base md:tw-text-2xl lg:tw-text-5xl'>
            Don’t just take our word for it
          </h3>
          <p className='tw-text-xs md:tw-text-lg lg:tw-text-xl tw-font-normal'>
            Feedback from these happy customers helps us in reaching the heights
          </p>
        </div>
      </div>
      <div className={Styles.feedback}>
        <div className={Styles.feedbackBox}>
          <Switcher slides={slides} />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
