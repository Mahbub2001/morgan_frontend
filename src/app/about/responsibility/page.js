import React from "react";

function Responsibility() {
  return (
    <div className="container mx-auto px-6 max-w-screen-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold">Our Responsibility</h3>
          <div className="mt-5">
            <p className="font-sans font-thin text-sm">
              All Decadent products are made with love and made to last through
              time and trends, and can be used across generations. They are all
              handmade in Turkey, from locally raised high-quality leather,
              which is also a waste product from the food industry, ensuring
              that no animal is killed for the sole purpose of making a bag.
              This also supports our zero-waste policy, ensuring that no leather
              goes unused; leather offcuts are made into reinforcements, key
              rings and other add-ons. This has been and always will be at the
              core of Decadent since the beginning of time.
              <br />
              Decadent's founding principles are based on careful consideration
              for all the people we work with, the animals from which our
              leather comes, and our one-point production in Turkey, manifesting
              the sustainable initiatives on which we build our business. At
              Decadent, we choose to produce based on demand and not in large
              quantities, to avoid excessive inventories. We strive to
              continuously develop and adapt to an ever-changing environment and
              business by carefully selecting our partners and suppliers and
              keeping our carbon footprint to a minimum.
            </p>
          </div>
        </div>

        <div className=" w-full md:w-1/2">
          <img
            className="w-full h-[25rem] rounded-sm shadow-lg"
            src="/images/c2.jpg"
            alt="Contact"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-12">
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-[25rem] rounded-sm shadow-lg"
            src="/images/c1.jpg"
            alt="Contact Us"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4">The design philosophy</h3>
          <p className="font-sans font-thin text-sm">
            The design philosophy behind Decadent Copenhagen values ​​timeless
            classics that are independent of seasons and trends. Furthermore, we
            have kept our supply chain short to have the highest control and the
            best standards, which results in our tannery, which we have worked
            with for 13 years, having achieved the ISO 45001 certificate as well
            as the Gold status of the Leather Working Group and REACH
            compliance. We have a very close partnership and friendship with our
            production facility in Turkey, and they only produce and collaborate
            with other brands that we feel are like-minded in strategy and
            mindset. At Decadent Copenhagen, we strive to make a difference on
            many levels and engage in social responsibility, which manifests
            itself through our various campaign collaborations with The Heart
            Association, Fight Against Cancer and Mother Aid over the years and
            donate the proceeds of sales to these important causes. As a free
            service, Decadent Copenhagen offers Life Extension Services , which
            means that customers can have their bags repaired to a certain
            extent. Contact us at info@decadentcopenhagen.dk for more
            information. This helps us to significantly extend the lifespan of
            our products.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Responsibility;
