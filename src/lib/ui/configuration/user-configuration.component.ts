import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EntityConfigurationComponent } from '@cartesianui/system-configuration';

/**
 * Thin route-level wrapper around <entity-configuration> for user scope.
 * After Phase 4.D (legacy migration complete), every user-scope section
 * is schema-driven — currently just `timing` (per-user time-zone override).
 *
 * The `bare` input previously let consumers render without the component's
 * own header chrome. <entity-configuration> doesn't add any chrome of its
 * own beyond the section tabs + Save button, so `bare` is a no-op now;
 * preserved as an Input for backwards-compatibility with existing
 * callsites.
 */
@Component({
  selector: 'user-configuration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EntityConfigurationComponent],
  standalone: true,
  template: `
    <entity-configuration entityType="users" [entityId]="resolvedEntityId"></entity-configuration>
  `,
})
export class UserConfigurationComponent {
  @Input() entityId?: string;

  /** No-op since the schema-driven widget doesn't add header chrome. */
  @Input() bare = false;

  protected get resolvedEntityId(): string | undefined {
    return this.entityId ?? cartesian.session?.userId?.toString();
  }
}
