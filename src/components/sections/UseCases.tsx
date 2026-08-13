import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { assetUrl } from '../../lib/assets'
import { useReveal } from '../../hooks/useReveal'
import {
  USE_CASE_DURATION_MS,
  USE_CASE_TABS,
} from '../../content/useCases'
import styles from './UseCases.module.css'

const POINTS_PER_TAB = 4

export function UseCases() {
  const sectionRef = useReveal<HTMLElement>()
  const tabListRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const baseId = useId()

  const [tabIndex, setTabIndex] = useState(0)
  const [pointIndex, setPointIndex] = useState(0)

  const tabIndexRef = useRef(tabIndex)
  const pointIndexRef = useRef(pointIndex)
  tabIndexRef.current = tabIndex
  pointIndexRef.current = pointIndex

  const goTo = useCallback((nextTab: number, nextPoint: number) => {
    setTabIndex(nextTab)
    setPointIndex(nextPoint)
  }, [])

  useEffect(() => {
    const tabList = tabListRef.current
    if (!tabList) return
    const activeTab = tabList.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!activeTab) return
    if (tabList.contains(document.activeElement)) {
      activeTab.focus()
    }
    if (!window.matchMedia('(max-width: 1023px)').matches) {
      return
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targetLeft =
      activeTab.offsetLeft - (tabList.clientWidth - activeTab.offsetWidth) / 2
    tabList.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [tabIndex])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId = 0
    let startTime: number | null = null

    const activeFill = () =>
      section.querySelector<HTMLElement>(
        `[data-progress-fill][data-tab="${tabIndexRef.current}"][data-point="${pointIndexRef.current}"]`,
      )

    section.querySelectorAll<HTMLElement>('[data-progress-fill]').forEach((el) => {
      el.style.transform = 'scaleX(0)'
    })

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts
      const progress = Math.min((ts - startTime) / USE_CASE_DURATION_MS, 1)
      const fill = activeFill()
      if (fill) fill.style.transform = `scaleX(${progress})`

      if (progress >= 1) {
        let nextPoint = pointIndexRef.current + 1
        let nextTab = tabIndexRef.current
        if (nextPoint >= POINTS_PER_TAB) {
          nextPoint = 0
          nextTab = (nextTab + 1) % USE_CASE_TABS.length
        }
        goTo(nextTab, nextPoint)
        return
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [goTo, sectionRef, tabIndex, pointIndex])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    let startX = 0
    let startY = 0
    let axis: 'x' | 'y' | 'off' | null = null
    let swiped = false
    let swipeTimer = 0

    const isMobile = () => window.matchMedia('(max-width: 767px)').matches

    const step = (delta: number) => {
      const total = USE_CASE_TABS.length * POINTS_PER_TAB
      const flat =
        (((tabIndexRef.current * POINTS_PER_TAB + pointIndexRef.current + delta) %
          total) +
          total) %
        total
      goTo(Math.floor(flat / POINTS_PER_TAB), flat % POINTS_PER_TAB)
    }

    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || !isMobile()) {
        axis = 'off'
        return
      }
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
      axis = null
      swiped = false
    }

    const onMove = (event: TouchEvent) => {
      if (axis !== null || event.touches.length !== 1) return
      const dx = event.touches[0].clientX - startX
      const dy = event.touches[0].clientY - startY
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }

    const onEnd = (event: TouchEvent) => {
      if (axis !== 'x') return
      const dx = event.changedTouches[0].clientX - startX
      if (Math.abs(dx) < 40) return
      swiped = true
      panel.dataset.swipe = dx < 0 ? 'next' : 'prev'
      step(dx < 0 ? 1 : -1)
      window.clearTimeout(swipeTimer)
      swipeTimer = window.setTimeout(() => {
        delete panel.dataset.swipe
      }, 280)
    }

    const onClick = (event: MouseEvent) => {
      if (!swiped) return
      swiped = false
      event.preventDefault()
      event.stopPropagation()
    }

    panel.addEventListener('touchstart', onStart, { passive: true })
    panel.addEventListener('touchmove', onMove, { passive: true })
    panel.addEventListener('touchend', onEnd, { passive: true })
    panel.addEventListener('click', onClick, true)

    return () => {
      window.clearTimeout(swipeTimer)
      panel.removeEventListener('touchstart', onStart)
      panel.removeEventListener('touchmove', onMove)
      panel.removeEventListener('touchend', onEnd)
      panel.removeEventListener('click', onClick, true)
    }
  }, [goTo])

  const activeMediaKey = `${tabIndex}-${pointIndex}`
  const tablistId = `${baseId}-tabs`

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} reveal`}
      id="use-cases"
      aria-labelledby="use-cases-title"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title} id="use-cases-title">
            <span className={styles.wide}>
              Любой контент в фирменном стиле за считанные минуты
            </span>
            <span className={styles.narrow}>
              Любой контент{'\n'}в фирменном стиле{'\n'}за считанные минуты
            </span>
          </h2>
          <div
            ref={tabListRef}
            className={styles.tabs}
            role="tablist"
            id={tablistId}
            aria-label="Форматы контента"
            onKeyDown={(event) => {
              const last = USE_CASE_TABS.length - 1
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault()
                goTo(tabIndex === last ? 0 : tabIndex + 1, 0)
              } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault()
                goTo(tabIndex === 0 ? last : tabIndex - 1, 0)
              } else if (event.key === 'Home') {
                event.preventDefault()
                goTo(0, 0)
              } else if (event.key === 'End') {
                event.preventDefault()
                goTo(last, 0)
              }
            }}
          >
            {USE_CASE_TABS.map((tab, index) => {
              const selected = index === tabIndex
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${tab.id}`}
                  className={[styles.tab, selected ? styles.tabActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => goTo(index, 0)}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.points}>
            {USE_CASE_TABS.map((tab, tIndex) => (
              <div
                key={tab.id}
                className={[
                  styles.pointSet,
                  tIndex !== tabIndex ? styles.pointSetHidden : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {tab.items.map((item, pIndex) => {
                  const active = tIndex === tabIndex && pIndex === pointIndex
                  return (
                    <article
                      key={item.title}
                      className={[styles.card, active ? styles.cardActive : '']
                        .filter(Boolean)
                        .join(' ')}
                      role="button"
                      tabIndex={tIndex === tabIndex ? 0 : -1}
                      aria-pressed={active}
                      onClick={() => goTo(tIndex, pIndex)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          goTo(tIndex, pIndex)
                        }
                      }}
                    >
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardDesc}>
                        <span>{item.description}</span>
                      </p>
                      <div className={styles.progress} aria-hidden="true">
                        <div
                          className={styles.progressFill}
                          data-progress-fill
                          data-tab={tIndex}
                          data-point={pIndex}
                        />
                      </div>
                    </article>
                  )
                })}
              </div>
            ))}
          </div>

          <div
            ref={panelRef}
            className={styles.panel}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${USE_CASE_TABS[tabIndex].id}`}
          >
            {USE_CASE_TABS.flatMap((tab, tIndex) =>
              tab.items.map((item, pIndex) => {
                const key = `${tIndex}-${pIndex}`
                const active = key === activeMediaKey
                return (
                  <img
                    key={key}
                    className={[styles.media, active ? styles.mediaActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    src={assetUrl(item.image)}
                    alt={active ? item.alt : ''}
                    width={2880}
                    height={1620}
                    loading={tIndex === 0 && pIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )
              }),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
