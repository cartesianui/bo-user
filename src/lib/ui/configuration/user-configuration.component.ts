import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EntityConfigurationComponent } from '@cartesianui/system-configuration';

/**
 * Thin route-level wrapper around <entity-configuration> for user scope.
 * Renders every registered user-scope schema section as a tab. Today the
 * only user-scope section is `regional` (per-user formatting + time zone +
 * locale override — owned by the localization workstream). When new
 * user-scope sections register (language, notifications, …), they appear
 * here automatically with no changes to this component.
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
