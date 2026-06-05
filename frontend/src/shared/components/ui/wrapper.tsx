import { Breadcrumb, type BreadcrumbProps, theme } from 'antd';
import { cn } from '../../utils';

interface WrapperProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumb?: Pick<BreadcrumbProps, 'items'>;
  endContent?: React.ReactNode;
  hasDivider?: boolean;
}

export function Wrapper({
  title,
  description,
  children,
  actions,
  breadcrumb,
  endContent,
  hasDivider = true,
}: WrapperProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <div
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {breadcrumb?.items && (
          <Breadcrumb
            items={breadcrumb.items}
            className="mb-6!"
            separator={<Separator />}
          />
        )}
        <div
          className={cn(
            'flex flex-col md:flex-row justify-between items-start md:items-center  pb-4  mb-8 gap-4',
            hasDivider ? 'border-b border-b-neutral-200' : 'border-none',
          )}
        >
          <div>
            {typeof title === 'string' ? (
              <h1 className="font-semibold text-2xl md:text-3xl text-neutral-900">
                {title}
              </h1>
            ) : (
              title
            )}
            {typeof description === 'string' ? (
              <p className="text-sm md:text-base text-neutral-500">
                {description}
              </p>
            ) : (
              description
            )}
          </div>
          {actions}
        </div>
        <div>{children}</div>
      </div>
      {endContent}
    </div>
  );
}

function Separator() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="#A4A7AE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
