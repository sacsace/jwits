import type { ClientCompany } from "@/lib/types";

export function ClientDirectoryGrid({
  clients,
  emptyLabel,
  noLogoLabel,
}: {
  clients: ClientCompany[];
  emptyLabel: string;
  noLogoLabel: string;
}) {
  if (clients.length === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {clients.map((client) => (
        <li
          key={client.id}
          className="grid aspect-square grid-rows-2 overflow-hidden rounded-lg border border-line bg-white"
        >
          <div className="flex min-h-0 items-center justify-center bg-paper/60 p-3">
            {client.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={client.logoUrl}
                alt={client.name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded border border-dashed border-line px-2 text-center text-[11px] text-muted">
                {noLogoLabel}
              </div>
            )}
          </div>
          <div className="flex min-h-0 items-center border-t border-line px-2">
            <p
              className="line-clamp-2 w-full text-center text-[12px] font-medium leading-snug text-ink"
              title={client.name}
            >
              {client.name}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
