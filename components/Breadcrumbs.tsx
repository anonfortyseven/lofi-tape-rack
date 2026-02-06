'use client'

import Link from 'next/link'
import { BreadcrumbJsonLd } from './JsonLd'

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Include JSON-LD schema (default: true) */
  includeSchema?: boolean;
}

export function Breadcrumbs({ items, includeSchema = true }: BreadcrumbsProps) {
  // Always include Home as the first item
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    ...items
  ];

  return (
    <>
      {includeSchema && <BreadcrumbJsonLd items={fullItems} />}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-zinc-600" aria-hidden="true">/</span>
                )}
                {isLast ? (
                  <span className="text-zinc-400" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.href} 
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
