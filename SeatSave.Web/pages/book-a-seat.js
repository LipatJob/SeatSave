export default function BookASeat() {
  return (
    <div class='bg-slate-200 min-h-screen min-w-screen flex items-center justify-center'>
      <div class='bg-slate-300 w-3/4 min-h-screen m-20 rounded-md'>
        <h1 class='text-6xl pl-48 pt-32 font-bold'>Book a Seat</h1>
        <h2 class='text-2xl pl-48 pt-5'>
          Center for Learning and Information Resources - Einstein Bldg.
        </h2>

        <div class='flex justify-center'>
          <h1 class='text-2xl font-bold pt-20'>Select your date</h1>
        </div>

        <div class='flex justify-center'>
          <div class='py-6'>
            <button class='bg-pearl-bush rounded-md w-40 mx-5'>
              <h3 class='text-2xl p-8'>April 21, 2022</h3>
            </button>

            <button class='bg-pearl-bush rounded-md w-40 mx-5'>
              <h3 class='text-2xl p-8'>April 22, 2022</h3>
            </button>
          </div>
        </div>

        <div class='flex justify-center'>
          <h1 class='text-2xl font-bold pt-20'>Select your time</h1>
        </div>

        <div class='flex justify-center'>
          <div class='py-6'>
            <button class='bg-pearl-bush rounded-md w-30 mx-5'>
              <h3 class='text-2xl px-12 py-4'>
                3:00
                <br />
                4:00
              </h3>
            </button>

            <button class='bg-pearl-bush rounded-md w-30 mx-5'>
              <h3 class='text-2xl px-12 py-4'>
                4:00
                <br />
                5:00
              </h3>
            </button>
          </div>
        </div>

        <div class='flex justify-center'>
          <h1 class='text-2xl font-bold pt-20'>Pick your seat</h1>
        </div>

        <div class='flex justify-center'>
          <div class='bg-pearl-bush py-6 w-3/6 h-96 m-6 rounded-lg overflow-x-auto'>
            <div class='grid grid-cols-2'>
              <button class='bg-bluish rounded-md m-5'>
                <h2 class='text-2xl p-8'>Einstein - E1</h2>
              </button>

              <button class='bg-bluish rounded-md m-5'>
                <h2 class='text-2xl p-8'>Einstein - E2</h2>
              </button>

              <button class='bg-bluish rounded-md m-5'>
                <h2 class='text-2xl p-8'>Einstein - E3</h2>
              </button>

              <button class='bg-bluish rounded-md m-5'>
                <h2 class='text-2xl p-8'>Einstein - E4</h2>
              </button>

              <button class='bg-bluish rounded-md m-5'>
                <h2 class='text-2xl p-8'>Einstein - E5</h2>
              </button>

              <button class='bg-bluish rounded-md m-5'>
                <h2 class='text-2xl p-8'>Einstein - E6</h2>
              </button>

              <button class='bg-bluish rounded-md m-5'>
                <h2 class='text-2xl p-8'>Einstein - E7</h2>
              </button>

              <button class='bg-bluish rounded-md m-5'>
                <h2 class='text-2xl p-8'>Einstein - E8</h2>
              </button>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
