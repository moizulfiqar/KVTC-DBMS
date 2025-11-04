-- Create report_views table to track which staff viewed which reports
CREATE TABLE IF NOT EXISTS report_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES student_reports(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES "User"(id) ON DELETE CASCADE,
    student_id BIGINT,
    viewed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(report_id, viewer_id)
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_report_views_report_id ON report_views(report_id);
CREATE INDEX IF NOT EXISTS idx_report_views_viewer_id ON report_views(viewer_id);
CREATE INDEX IF NOT EXISTS idx_report_views_student_id ON report_views(student_id);

-- RLS Policies
ALTER TABLE report_views ENABLE ROW LEVEL SECURITY;

-- Staff can insert their own view records
CREATE POLICY "Staff can track views"
ON report_views
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM "User" 
        WHERE "User".id = auth.uid() 
        AND "User".role IN ('staff', 'employee')
    )
);

-- Admins can see all view records
CREATE POLICY "Admin can view all tracking"
ON report_views
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM "User" 
        WHERE "User".id = auth.uid() 
        AND "User".role = 'admin'
    )
);

