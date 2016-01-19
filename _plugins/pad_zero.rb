module Jekyll
  module PadZero
    def pad_zero(number)
      "%02d"%number
    end
  end
end

Liquid::Template.register_filter(Jekyll::PadZero)