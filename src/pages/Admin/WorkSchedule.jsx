import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  useTheme,
  TextField,
  Autocomplete,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material'
import { useOutletContext } from 'react-router'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)

// Dữ liệu mẫu: danh sách bác sĩ và lịch làm việc (có thể thay bằng API thật)
const doctors = [
  {
    id: 1,
    name: 'BS. Nguyễn Văn A',
    avatar: '',
    specialty: 'Nội tổng quát',
    schedule: {
      'Thứ 2': 'Sáng, Chiều',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Nghỉ',
      'Thứ 5': 'Sáng',
      'Thứ 6': 'Chiều',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 2,
    name: 'BS. Trần Thị B',
    avatar: '',
    specialty: 'Nhi khoa',
    schedule: {
      'Thứ 2': 'Chiều',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Sáng, Chiều',
      'Thứ 5': 'Nghỉ',
      'Thứ 6': 'Sáng',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 3,
    name: 'BS. Lê Văn C',
    avatar: '',
    specialty: 'Ngoại tổng quát',
    schedule: {
      'Thứ 2': 'Nghỉ',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Chiều',
      'Thứ 5': 'Chiều',
      'Thứ 6': 'Sáng',
      'Thứ 7': 'Nghỉ',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 4,
    name: 'BS. Phạm Thị D',
    avatar: '',
    specialty: 'Sản phụ khoa',
    schedule: {
      'Thứ 2': 'Sáng',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Chiều',
      'Thứ 5': 'Chiều',
      'Thứ 6': 'Nghỉ',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 5,
    name: 'BS. Đỗ Văn E',
    avatar: '',
    specialty: 'Tai mũi họng',
    schedule: {
      'Thứ 2': 'Chiều',
      'Thứ 3': 'Nghỉ',
      'Thứ 4': 'Sáng',
      'Thứ 5': 'Sáng',
      'Thứ 6': 'Chiều',
      'Thứ 7': 'Chiều',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 6,
    name: 'BS. Nguyễn Thị F',
    avatar: '',
    specialty: 'Da liễu',
    schedule: {
      'Thứ 2': 'Sáng',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Sáng',
      'Thứ 5': 'Nghỉ',
      'Thứ 6': 'Sáng',
      'Thứ 7': 'Chiều',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 7,
    name: 'BS. Trần Văn G',
    avatar: '',
    specialty: 'Tim mạch',
    schedule: {
      'Thứ 2': 'Nghỉ',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Chiều',
      'Thứ 5': 'Sáng',
      'Thứ 6': 'Chiều',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 8,
    name: 'BS. Lê Thị H',
    avatar: '',
    specialty: 'Nội tiết',
    schedule: {
      'Thứ 2': 'Chiều',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Nghỉ',
      'Thứ 5': 'Chiều',
      'Thứ 6': 'Sáng',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 9,
    name: 'BS. Phạm Văn I',
    avatar: '',
    specialty: 'Thần kinh',
    schedule: {
      'Thứ 2': 'Sáng',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Sáng',
      'Thứ 5': 'Chiều',
      'Thứ 6': 'Nghỉ',
      'Thứ 7': 'Chiều',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 10,
    name: 'BS. Đỗ Thị K',
    avatar: '',
    specialty: 'Chấn thương chỉnh hình',
    schedule: {
      'Thứ 2': 'Chiều',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Chiều',
      'Thứ 5': 'Nghỉ',
      'Thứ 6': 'Sáng',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 11,
    name: 'BS. Nguyễn Văn L',
    avatar: '',
    specialty: 'Nội soi',
    schedule: {
      'Thứ 2': 'Sáng',
      'Thứ 3': 'Nghỉ',
      'Thứ 4': 'Chiều',
      'Thứ 5': 'Sáng',
      'Thứ 6': 'Chiều',
      'Thứ 7': 'Chiều',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 12,
    name: 'BS. Trần Thị M',
    avatar: '',
    specialty: 'Hô hấp',
    schedule: {
      'Thứ 2': 'Chiều',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Sáng',
      'Thứ 5': 'Chiều',
      'Thứ 6': 'Nghỉ',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 13,
    name: 'BS. Lê Văn N',
    avatar: '',
    specialty: 'Tiêu hóa',
    schedule: {
      'Thứ 2': 'Nghỉ',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Sáng',
      'Thứ 5': 'Sáng',
      'Thứ 6': 'Chiều',
      'Thứ 7': 'Chiều',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 14,
    name: 'BS. Phạm Thị O',
    avatar: '',
    specialty: 'Mắt',
    schedule: {
      'Thứ 2': 'Sáng',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Nghỉ',
      'Thứ 5': 'Chiều',
      'Thứ 6': 'Sáng',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 15,
    name: 'BS. Đỗ Văn P',
    avatar: '',
    specialty: 'Răng hàm mặt',
    schedule: {
      'Thứ 2': 'Chiều',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Chiều',
      'Thứ 5': 'Sáng',
      'Thứ 6': 'Nghỉ',
      'Thứ 7': 'Chiều',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 16,
    name: 'BS. Nguyễn Thị Q',
    avatar: '',
    specialty: 'Ung bướu',
    schedule: {
      'Thứ 2': 'Sáng',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Sáng',
      'Thứ 5': 'Nghỉ',
      'Thứ 6': 'Chiều',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 17,
    name: 'BS. Trần Văn R',
    avatar: '',
    specialty: 'Phục hồi chức năng',
    schedule: {
      'Thứ 2': 'Chiều',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Chiều',
      'Thứ 5': 'Sáng',
      'Thứ 6': 'Sáng',
      'Thứ 7': 'Nghỉ',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 18,
    name: 'BS. Lê Thị S',
    avatar: '',
    specialty: 'Tâm thần',
    schedule: {
      'Thứ 2': 'Nghỉ',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Sáng',
      'Thứ 5': 'Chiều',
      'Thứ 6': 'Sáng',
      'Thứ 7': 'Chiều',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 19,
    name: 'BS. Phạm Văn T',
    avatar: '',
    specialty: 'Huyết học',
    schedule: {
      'Thứ 2': 'Sáng',
      'Thứ 3': 'Sáng',
      'Thứ 4': 'Chiều',
      'Thứ 5': 'Nghỉ',
      'Thứ 6': 'Chiều',
      'Thứ 7': 'Sáng',
      'Chủ nhật': 'Nghỉ',
    },
  },
  {
    id: 20,
    name: 'BS. Đỗ Thị U',
    avatar: '',
    specialty: 'Thận tiết niệu',
    schedule: {
      'Thứ 2': 'Chiều',
      'Thứ 3': 'Chiều',
      'Thứ 4': 'Sáng',
      'Thứ 5': 'Sáng',
      'Thứ 6': 'Nghỉ',
      'Thứ 7': 'Chiều',
      'Chủ nhật': 'Nghỉ',
    },
  },
]

// Các ngày trong tuần (có thể tuỳ chỉnh)
const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']

// Hàm lấy mảng 7 ngày (dayjs) của tuần chứa date truyền vào (Thứ 2 -> Chủ nhật)
function getWeekDates(date) {
  // Lấy thứ của ngày hiện tại (0=Chủ nhật, 1=Thứ 2, ..., 6=Thứ 7)
  const dayOfWeek = dayjs(date).day()
  // Tính offset để về Thứ 2 (nếu Chủ nhật thì lùi 6 ngày, còn lại lùi dayOfWeek-1)
  const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const startOfWeek = dayjs(date).add(offset, 'day')
  return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'))
}

const WorkSchedule = () => {
  // Set tiêu đề động cho AppBar qua Outlet context
  const outletContext = useOutletContext && useOutletContext()
  if (outletContext && typeof outletContext === 'object') {
    outletContext.pageTitle = 'Lịch làm việc của bác sĩ'
  }
  const theme = useTheme() // lấy theme để biết mode

  // State filter/search
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [dayFilter, setDayFilter] = useState('')
  const [shiftFilter, setShiftFilter] = useState('')
  const [date, setDate] = useState(dayjs())

  // Lấy danh sách chuyên khoa duy nhất
  const specialties = useMemo(() => {
    const set = new Set()
    doctors.forEach((d) => set.add(d.specialty))
    return Array.from(set)
  }, [])

  // Lấy danh sách ca duy nhất
  const allShifts = useMemo(() => {
    const set = new Set()
    doctors.forEach((d) => {
      Object.values(d.schedule).forEach((v) =>
        v.split(',').forEach((ca) => set.add(ca.trim()))
      )
    })
    return Array.from(set).filter((v) => v && v !== 'Nghỉ')
  }, [])

  // Lấy danh sách ngày (có thể mở rộng cho nhiều tuần)
  const allDays = days

  // Lọc dữ liệu
  // Tìm các ngày (columns) có ít nhất 1 bác sĩ có ca phù hợp
  const filteredDays = useMemo(() => {
    if (!shiftFilter) return days
    // Chỉ lấy các ngày mà có ít nhất 1 bác sĩ có ca này
    return days.filter((day) =>
      doctors.some((doctor) =>
        (doctor.schedule[day] || '')
          .split(',')
          .map((c) => c.trim())
          .includes(shiftFilter)
      )
    )
  }, [shiftFilter])

  // Lọc bác sĩ có ca phù hợp trong các ngày đang hiển thị
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      // Search theo tên
      if (search && !doctor.name.toLowerCase().includes(search.toLowerCase()))
        return false
      // Lọc theo chuyên khoa
      if (specialty && doctor.specialty !== specialty) return false
      // Lọc theo ngày
      if (dayFilter && !doctor.schedule[dayFilter]) return false
      // Lọc theo ca: bác sĩ phải có ca này ở ít nhất 1 ngày đang hiển thị
      if (shiftFilter) {
        const daysToCheck = dayFilter ? [dayFilter] : filteredDays
        const hasShift = daysToCheck.some((day) =>
          (doctor.schedule[day] || '')
            .split(',')
            .map((c) => c.trim())
            .includes(shiftFilter)
        )
        if (!hasShift) return false
      }
      return true
    })
  }, [search, specialty, dayFilter, shiftFilter, date, filteredDays])

  // Xác định ngày đang xem (theo date picker hoặc theo filter)
  // Map lại cho đúng: days[0]=Thứ 2, days[6]=Chủ nhật
  const currentDay = dayFilter || days[date.day() === 0 ? 6 : date.day() - 1]

  // Lấy mảng ngày trong tuần hiện tại (theo date picker)
  const weekDates = useMemo(() => getWeekDates(date), [date])

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3, boxSizing: 'border-box' }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Lịch làm việc của bác sĩ
      </Typography>
      {/* Bộ lọc và tìm kiếm */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2,
          alignItems: 'center',
        }}
      >
        {/* Search theo tên bác sĩ */}
        <TextField
          label="Tìm kiếm bác sĩ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        />
        {/* Lọc theo chuyên khoa (Autocomplete) */}
        <Autocomplete
          options={specialties}
          value={specialty}
          onChange={(_, newValue) => setSpecialty(newValue || '')}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chuyên khoa"
              size="small"
              sx={{ minWidth: 180 }}
            />
          )}
          isOptionEqualToValue={(option, value) => option === value}
          clearOnEscape
        />
        {/* Lọc theo ngày trong tuần */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Ngày</InputLabel>
          <Select
            value={dayFilter}
            label="Ngày"
            onChange={(e) => setDayFilter(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {allDays.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Lọc theo ca */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Ca</InputLabel>
          <Select
            value={shiftFilter}
            label="Ca"
            onChange={(e) => setShiftFilter(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {allShifts.map((ca) => (
              <MenuItem key={ca} value={ca}>
                {ca}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Chọn ngày thực tế (để xem lịch đã qua hoặc sắp tới) */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Chọn ngày"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            format="DD/MM/YYYY"
            slotProps={{ textField: { size: 'small', sx: { minWidth: 150 } } }}
          />
        </LocalizationProvider>
        {/* Nút reset filter */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setSearch('')
            setSpecialty('')
            setDayFilter('')
            setShiftFilter('')
            setDate(dayjs())
          }}
        >
          Đặt lại
        </Button>
      </Box>
      {/* Table scroll bar luôn hiển thị, chiếm full nội dung */}

      <TableContainer
        component={Paper}
        sx={{
          height: 'calc(100vh - 180px)',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <Table stickyHeader sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, minWidth: 220 }}>
                Bác sĩ
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>
                Chuyên khoa
              </TableCell>
              {/* Render các cột ngày: Thứ + ngày/tháng */}
              {filteredDays.map((day, idx) => {
                const dateObj = weekDates[days.indexOf(day)]
                const isToday = dateObj.isSame(dayjs(), 'day')
                const isSelected = dayFilter === day
                // --- Highlight border for header (ngày hôm nay/ngày filter) ---
                // const highlightBorder = ... (đã bỏ border để clean code)
                return (
                  <TableCell
                    key={day}
                    align="center"
                    sx={{
                      fontWeight: 600,
                      minWidth: 110,
                      // border: highlightBorder, // ĐÃ BỎ border nét đứt cho header
                      background: isToday
                        ? theme.palette.mode === 'dark'
                          ? '#1e293b'
                          : '#e3f2fd'
                        : isSelected
                          ? theme.palette.mode === 'dark'
                            ? '#fffde733'
                            : '#fffde7'
                          : undefined,
                      transition: 'all 0.2s',
                    }}
                  >
                    <Box>
                      <Typography fontWeight={700}>{day}</Typography>
                      <Typography fontSize={13} color="text.secondary">
                        {dateObj.format('DD/MM')}
                      </Typography>
                    </Box>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render từng bác sĩ */}
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={doctor.avatar} alt={doctor.name} />
                    <Typography fontWeight={500}>{doctor.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                {/* Render lịch từng ngày */}
                {filteredDays.map((day) => {
                  const caList = (doctor.schedule[day] || '-')
                    .split(',')
                    .map((c) => c.trim())
                  const displayCa = shiftFilter
                    ? caList.filter((c) => c === shiftFilter)
                    : caList
                  const dateObj = weekDates[days.indexOf(day)]
                  const isToday = dateObj.isSame(dayjs(), 'day')
                  const isSelected = dayFilter === day
                  // --- Highlight border for body cell (ngày hôm nay/ngày filter) ---
                  // const highlightBorder = ... (đã bỏ border để clean code)
                  return (
                    <TableCell
                      key={day}
                      align="center"
                      sx={{
                        // border: highlightBorder, // ĐÃ BỎ border nét đứt cho cell body
                        background: isToday
                          ? theme.palette.mode === 'dark'
                            ? '#1e293b'
                            : '#e3f2fd'
                          : isSelected
                            ? theme.palette.mode === 'dark'
                              ? '#fffde733'
                              : '#fffde7'
                            : undefined,
                        transition: 'all 0.2s',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        {displayCa.length > 0 && displayCa[0] !== '-' ? (
                          displayCa.map((ca, idx) => {
                            let bg, color, border
                            if (ca === 'Nghỉ') {
                              bg =
                                theme.palette.mode === 'dark'
                                  ? '#23272f'
                                  : '#f5f5f5'
                              color =
                                theme.palette.mode === 'dark'
                                  ? '#90a4ae'
                                  : 'text.secondary'
                              border =
                                theme.palette.mode === 'dark'
                                  ? '1px dashed #444'
                                  : '1px dashed #ccc'
                            } else if (ca === 'Sáng') {
                              bg =
                                theme.palette.mode === 'dark'
                                  ? '#1976d2'
                                  : '#e3f2fd'
                              color =
                                theme.palette.mode === 'dark'
                                  ? '#fff'
                                  : '#1976d2'
                              border = 'none'
                            } else if (ca === 'Chiều') {
                              bg =
                                theme.palette.mode === 'dark'
                                  ? '#fbc02d'
                                  : '#fffde7'
                              color =
                                theme.palette.mode === 'dark'
                                  ? '#222'
                                  : '#f9a825'
                              border = 'none'
                            } else {
                              bg =
                                theme.palette.mode === 'dark' ? '#333' : '#eee'
                              color =
                                theme.palette.mode === 'dark' ? '#fff' : '#222'
                              border = 'none'
                            }
                            return (
                              <Box
                                key={idx}
                                sx={{
                                  bgcolor: bg,
                                  color: color,
                                  borderRadius: 1,
                                  px: 1.5,
                                  py: 0.5,
                                  fontWeight: 500,
                                  fontSize: 15,
                                  minWidth: 60,
                                  mb: 0.2,
                                  border: border,
                                  boxShadow:
                                    ca === 'Nghỉ'
                                      ? 'none'
                                      : theme.palette.mode === 'dark'
                                        ? '0 1px 4px #1118'
                                        : '0 1px 4px #e0e0e0',
                                  textAlign: 'center',
                                }}
                              >
                                {ca}
                              </Box>
                            )
                          })
                        ) : !shiftFilter ? (
                          <Typography color="text.secondary" fontSize={16}>
                            -
                          </Typography>
                        ) : null}
                      </Box>
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* // Có thể thêm filter, tìm kiếm, hoặc tuỳ chỉnh thêm ở đây */}
    </Box>
  )
}

export default WorkSchedule
