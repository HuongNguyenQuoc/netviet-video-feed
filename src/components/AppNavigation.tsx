import { navItems } from "@/constants/navigation";

export default function AppNavigation() {
  return (
    <>
      <nav className="hidden lg:fixed lg:left-0 lg:top-0 lg:z-50 lg:flex lg:h-screen lg:w-24 lg:flex-col lg:items-center lg:border-r lg:border-white/10 lg:bg-black/90 lg:py-8">
        <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-black">
          N
        </div>

        <div className="flex flex-1 flex-col items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`flex flex-col items-center gap-1 text-xs transition hover: scale-105 ${
                  item.active ? "text-white" : "text-white/50"
                }`}
              >
                <Icon size={26} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-white/10
      bg-black/90 backdrop-blur lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button 
              key={item.label}
              type="button"
              className={`flex flex-col items-center gap-1 text-[11px] transition active:scale-95 ${
                item.active ? "text-white" : "text-white/50"
              }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}