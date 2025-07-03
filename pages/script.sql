create table "User" (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'employee')),
  created_at timestamp with time zone default now()
);

create table student_reports (
  id uuid primary key default gen_random_uuid(),
  student_id bigint references students(id) on delete cascade,
  report_type text check (report_type in ('mtr', 'pdr', 'ttb', 'ftr')),
  file_url text not null,
  uploaded_by uuid references "User"(id) on delete set null,
  comments text,
  uploaded_at timestamptz default now(),
  version text
);


create policy "Admin full access"
on student_reports
for all
using (exists (select 1 from "User" where "User".id = auth.uid() and "User".role = 'admin'));


create policy "Employee read"
on student_reports
for select
using (exists (select 1 from "User" where "User".id = auth.uid() and "User".role = 'employee'));
