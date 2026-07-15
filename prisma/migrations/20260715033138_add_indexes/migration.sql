-- CreateIndex
CREATE INDEX "events_type_payload_idx" ON "events"("type", "payload");

-- CreateIndex
CREATE INDEX "project_name_idx" ON "project"("name");
