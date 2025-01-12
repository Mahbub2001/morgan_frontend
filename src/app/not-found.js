import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="-mt-24 md:mt-0 relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      // style={{ fontFamily: 'sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex w-full grow bg-white p-4">
              <div className="w-full gap-1 overflow-hidden bg-white rounded-xl flex">
                <div
                  className="w-full h-[20rem] md:h-[30rem] bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                  style={{
                    backgroundImage: 'url("/images/err1.png")',
                  }}
                ></div>
              </div>
            </div>
            <h1 className="text-[#171411] tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
              We're sorry, something went wrong.
            </h1>
            <p className="text-[#171411] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Please check back in a few minutes. If you need immediate help,
              please contact us.
            </p>
            <div className="flex px-4 py-3 justify-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e2752c] hover:bg-[#f38b45] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <Link href="/" className="truncate text-center">
                  Back to shopping
                </Link>
              </button>
            </div>
            <h3 className="text-[#171411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Shop our other categories
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage: 'url("/images/err2.png")',
                  }}
                ></div>
                <p className="text-[#171411] text-base font-medium leading-normal">
                  Women's Handbags
                </p>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage: 'url("/images/err3.png")',
                  }}
                ></div>
                <p className="text-[#171411] text-base font-medium leading-normal">
                  Men's Bags
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
