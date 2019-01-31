import { trigger, transition, animate, style, group} from '@angular/animations'

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        transition(':enter', [
            style({ transform: 'translateX(-100%)', "max-width": '0', opacity: 0 }),
            group([
                animate('150ms ease-out', style({ "max-width": '25%' })),
                animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 })),
            ])
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)', "max-width": '25%', opacity: 1 }),
            group([
                animate('150ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
                animate('300ms ease-out', style({ "max-width": '0' }))
            ]),
        ])
    ])
];